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

    const awsRes = await fetch(
      `https://places.geo.${region}.amazonaws.com/v2/autocomplete?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

    if (!awsRes.ok) {
      const text = await awsRes.text();
      return Response.json(
        { error: "AWS autocomplete failed", details: text },
        { status: 500 }
      );
    }

    const data = await awsRes.json();

    const results =
      data.ResultItems?.map((item: any) => {
        const fallbackLabel = [
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
            "Unknown address",
          raw: item,
        };
      }) || [];

    return Response.json({ results });
  } catch (error: any) {
    return Response.json(
      { error: "Server error", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}