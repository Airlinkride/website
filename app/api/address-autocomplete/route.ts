export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    if (q.length < 4) {
      return Response.json({ results: [] });
    }

    const apiKey = process.env.AWS_LOCATION_API_KEY;
    const region = process.env.AWS_REGION || "ca-central-1";

    if (!apiKey) {
      return Response.json(
        { error: "AWS_LOCATION_API_KEY is missing" },
        { status: 500 }
      );
    }

    // SearchText: best for airports, hotels, malls, businesses
    const searchTextRes = await fetch(
      `https://places.geo.${region}.amazonaws.com/v2/search-text?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          QueryText: q,
          Filter: {
            IncludeCountries: ["CAN"],
            BoundingBox: [-141.0, 41.7, -52.6, 83.1],
          },
          MaxResults: 5,
        }),
      }
    );

    if (!searchTextRes.ok) {
      const text = await searchTextRes.text();
      return Response.json(
        { error: "AWS search-text failed", details: text },
        { status: 500 }
      );
    }

    const searchTextData = await searchTextRes.json();
    const searchTextItems = searchTextData.ResultItems || [];

    // Autocomplete: best for addresses / streets
    const autocompleteRes = await fetch(
      `https://places.geo.${region}.amazonaws.com/v2/autocomplete?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          QueryText: q,
          Filter: {
            IncludeCountries: ["CAN"],
          },
          AdditionalFeatures: ["Core"],
          MaxResults: 5,
        }),
      }
    );

    if (!autocompleteRes.ok) {
      const text = await autocompleteRes.text();
      return Response.json(
        { error: "AWS autocomplete failed", details: text },
        { status: 500 }
      );
    }

    const autocompleteData = await autocompleteRes.json();
    const autocompleteItems = autocompleteData.ResultItems || [];

    const combinedItems = [...searchTextItems, ...autocompleteItems];

    const uniqueItems = combinedItems.filter(
      (item, index, self) =>
        item.PlaceId &&
        index === self.findIndex((x) => x.PlaceId === item.PlaceId)
    );

    const results = uniqueItems.map((item: any) => {
      const fallbackLabel = [
        item.Title,
        item.Address?.Label,
        [item.Address?.AddressNumber, item.Address?.Street]
          .filter(Boolean)
          .join(" "),
        item.Address?.Municipality,
        item.Address?.Region,
        item.Address?.PostalCode,
      ]
        .filter(Boolean)
        .join(", ");

      return {
        placeId: item.PlaceId,
        label:
          item.Title ||
          item.Address?.Label ||
          fallbackLabel ||
          "Unknown location",
        type: item.PlaceType,
        raw: item,
      };
    });

    return Response.json({ results });
  } catch (error: any) {
    return Response.json(
      {
        error: "Server error",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}