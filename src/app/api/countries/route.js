export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const region = searchParams.get("region");
    const search = searchParams.get("search");
    let endpoint;

    if (search) {
        endpoint = `https://restcountries.com/v3.1/name/${encodeURIComponent(search)}`;
    } else if (region) {
        endpoint = `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`;
    }

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Failed to fetch countries");
        }

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            throw new Error("Failed to parse response as JSON.");
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
