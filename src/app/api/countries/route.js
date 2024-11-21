export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const region = searchParams.get("region");

    const endpoint = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
