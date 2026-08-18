export const runtime = "nodejs";

type AwsPlaceItem = {
  PlaceId?: string;
  PlaceType?: string;
  Title?: string;
  Address?: {
    Label?: string;
    AddressNumber?: string;
    Street?: string;
    Locality?: string;
    District?: string;
    PostalCode?: string;
    Region?: {
      Code?: string;
      Name?: string;
    };
    Country?: {
      Code2?: string;
      Code3?: string;
      Name?: string;
    };
  };
  Position?: number[];
};

type AwsPlacesResponse = {
  ResultItems?: AwsPlaceItem[];
};

const TORONTO_PEARSON_POSITION = [-79.6248, 43.6777];

async function callAwsPlaces(
  endpoint: "search-text" | "autocomplete" | "geocode",
  apiKey: string,
  region: string,
  body: Record<string, unknown>,
): Promise<AwsPlaceItem[]> {
  try {
    const response = await fetch(
      `https://places.geo.${region}.amazonaws.com/v2/${endpoint}?key=${encodeURIComponent(
        apiKey,
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const details = await response.text();

      console.error(`AWS ${endpoint} failed:`, {
        status: response.status,
        details,
      });

      return [];
    }

    const data = (await response.json()) as AwsPlacesResponse;

    return data.ResultItems || [];
  } catch (error) {
    console.error(`AWS ${endpoint} request error:`, error);
    return [];
  }
}

function buildLabel(item: AwsPlaceItem): string {
  if (item.Address?.Label) {
    return item.Address.Label;
  }

  if (item.Title) {
    return item.Title;
  }

  const streetAddress = [
    item.Address?.AddressNumber,
    item.Address?.Street,
  ]
    .filter(Boolean)
    .join(" ");

  return [
    streetAddress,
    item.Address?.District,
    item.Address?.Locality,
    item.Address?.Region?.Code || item.Address?.Region?.Name,
    item.Address?.PostalCode,
    item.Address?.Country?.Name,
  ]
    .filter(Boolean)
    .join(", ");
}

function createDeduplicationKey(item: AwsPlaceItem): string {
  if (item.PlaceId) {
    return `place:${item.PlaceId}`;
  }

  const label = buildLabel(item).trim().toLowerCase();
  const position = item.Position?.join(",") || "";

  return `fallback:${label}:${position}`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").trim();

    if (query.length < 3) {
      return Response.json({ results: [] });
    }

    const apiKey = process.env.LOCATION_API_KEY;
    const region = process.env.LOCATION_REGION || "ca-central-1";

    if (!apiKey) {
      console.error("LOCATION_API_KEY is missing.");

      return Response.json(
        { error: "Address search service is not configured." },
        { status: 500 },
      );
    }

    const commonFilter = {
      IncludeCountries: ["CAN"],
    };

    const [searchTextItems, autocompleteItems, geocodeItems] =
      await Promise.all([
        // Best for airports, hotels, businesses, landmarks and other POIs.
        callAwsPlaces("search-text", apiKey, region, {
          QueryText: query,
          BiasPosition: TORONTO_PEARSON_POSITION,
          Filter: commonFilter,
          Language: "en-CA",
          MaxResults: 10,
        }),

        // Best for partially typed street and civic addresses.
        callAwsPlaces("autocomplete", apiKey, region, {
          QueryText: query,
          BiasPosition: TORONTO_PEARSON_POSITION,
          Filter: commonFilter,
          AdditionalFeatures: ["Core"],
          Language: "en-CA",
          MaxResults: 10,
        }),

        // Useful for complete street addresses, postal codes and cities.
        callAwsPlaces("geocode", apiKey, region, {
          QueryText: query,
          BiasPosition: TORONTO_PEARSON_POSITION,
          Filter: commonFilter,
          Language: "en-CA",
          MaxResults: 10,
        }),
      ]);

    const combinedItems = [
      ...searchTextItems,
      ...autocompleteItems,
      ...geocodeItems,
    ];

    const seen = new Set<string>();

    const uniqueItems = combinedItems.filter((item) => {
      const key = createDeduplicationKey(item);

      if (!key || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });

    const results = uniqueItems
      .map((item) => {
        const label = buildLabel(item);

        return {
          placeId: item.PlaceId || createDeduplicationKey(item),
          label: label || "Unknown location",
          type: item.PlaceType || "Unknown",
          position: item.Position || null,
        };
      })
      .filter((item) => item.label !== "Unknown location")
      .slice(0, 15);

    return Response.json({ results });
  } catch (error) {
    console.error("Address autocomplete server error:", error);

    return Response.json(
      {
        error: "Unable to search for addresses.",
        details:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 },
    );
  }
}