"use server";

import {GrFormPreviousLink} from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import LeafletMap from "@/app/UI components/LeafletMap";
import CountryPageClient from "@/app/UI components/countryPageClient";

const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZjEwYzg4OWIwYmIxMjc3MDczNjc4NjcyYzUzMDI0NiIsImp0aSI6ImNmMTllNGI3NWNmMGY3M2ZkODMxMzMyMTBlMWZlMTAzMzE1YmNhYzUwMGUwNzBjNzEwMTVmNGVlYjllOWNjZGQ0NGQ3NTA4YmIxNTM0MDAzIiwiaWF0IjoxNzMzNTk4ODk0LjgxMTg1NiwibmJmIjoxNzMzNTk4ODk0LjgxMTg1OSwiZXhwIjozMzI5MDUwNzY5NC44MDk1NjYsInN1YiI6Ijc3MDgzNjc1IiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.Js4qtki9GGmG5TaoBca9sGNfhF44C62t58lV8eh2VRZ95kXBgdXNuabZz-dRWaJ3C8cPeFkXFMv6UF5WDm_TPtHtDgHy1BQsrr9yRGgN4OUbnIfY-0PvAspz7bv1RW1UO0pIHWFxr_PacRizk1JqdRJWCHONNvpMGLytEagZBBudgVM32KATDWqGEIZ0QABiKM-t3iFyop9_JODdAZKqBiAVErOlLE4RmknFKSBB-wDqMzCv03eHveALyH0GlyZmq9_4OxrIoOQaZKADaigEw4iOGlQiRgGmNUm0JUOas4ZdB2dcA_uc8ZPRZD-TbJCsyv2h2UEnIDaio4DBnEEruLb60vgGgwOb1qqU2OS-5XEmb-wQPsiVYWfLruSVnp7pgE81QLVnGtnDZaYsr6zc2RHs9VZQPd6CNgOcwaO5yktI7SvNSUyz2nIZ8wJmJZUjLx-3tcTCf1kdUEHCkFigeZLdjm0adz1PVOVpLlv4xeo8H2yLysbmSmcJqVbfbVMmZfzonqxI-6roG1hwjUBcvsyc9wf2AwCKyceA8X5SoqSRGpPLgvgcRLmWYd-PWtQXZmN4ttCPVU6laHaFpVRgL43ACCzZjGs3aRna-LWtLVvslyVLWn_YZRTn_j8TYdBuSbp8HR-uz9TJ-NKBPtOp5UFGdDXP-rmwcc5UuCJY62o"

async function getCountryData(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if (!response.ok) {
            throw new Error("Could not find a country");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCountryDataByCode(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);

        if (!response.ok) {
            throw new Error("Could not find a country");
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function getZoomLevel(area) {
    console.log(area)
    const areaInt = parseInt(area);
    if (areaInt > 10000000) {
        return 3;
    } else if (areaInt > 1000000) {
        return 4;
    } else if (areaInt > 500000) {
        return 5;
    } else if (areaInt > 100000) {
        return 6;
    } else if (areaInt > 50000) {
        return 6;
    } else if (areaInt > 10000) {
        return 7;
    } else if (areaInt > 5000) {
        return 8;
    } else {
        return 9;
    }
}

async function topCountryEvents(countryName) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/historicalevents?text=${countryName}`, {
            headers: {
                "X-API-KEY": "kqeXjmfuj1VNQOdCO+YyRg==9gqihiKyolznfBAc"
            }
        });
        if (!response.ok) {
            throw new Error("Could not find a country events data");
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

async function wikiApi(countryName) {
    try {
        const url = `https://api.wikimedia.org/core/v1/wikipedia/en/page/${countryName}/html`
        const response = await fetch(url, {
            headers: {
                "Authorization": access_token,
                "Api-User-Agent": "Countries REST API"
            }
        })
        if (!response.ok) {
            throw new Error("Could not find a country events data");
        }
        return url;
    } catch (error) {
        console.error(error)
    }
}

async function weatherData(lat, ln) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${ln}&appid=e5140bb7551e6f249850c8b1977eaa6b`;
        const response = await fetch(url, {
        })
        if (!response.ok) {
            throw new Error("Could not find a country events data");
        }
        const data = await response.json();
        console.log(data)
    } catch (e) {
        console.error(e)
    }
}


async function CountryPage({params}) {
    const {countryName} = await params;
    const borderCountries = [];
    const countryData =  await getCountryData(countryName);
    const historicalEvents = await topCountryEvents(countryData[0].name.common);
    const wikiUrl = await wikiApi(countryData[0].name.common);
    if (!countryData) {
        return <div>Country is not Found</div>
    }
    await weatherData(countryData[0].latlng[0], countryData[0].latlng[1]);
    const zoomLevel = getZoomLevel(countryData[0].area);
    if (countryData[0]?.borders?.length > 0) {
        for(let i = 0; i < countryData[0].borders.length; i++) {
            const borderCode = countryData[0].borders[i];
            const country = await getCountryDataByCode(borderCode);
            borderCountries.push({
                countryCode: borderCode,
                name: country[0].name.official
            });
        }
    }

    const sortedEvents = historicalEvents.sort((a, b) => {
        const dateA = new Date(`${a.year}-${a.month}-${a.day}`);
        const dateB = new Date(`${b.year}-${b.month}-${b.day}`);
        return dateA - dateB;
    })

    return (
        <CountryPageClient wikiUrl={wikiUrl} historicalEvents={sortedEvents} zoomLevel={zoomLevel} countryData={countryData} borderCountries={borderCountries} />
    )
}

export default CountryPage;