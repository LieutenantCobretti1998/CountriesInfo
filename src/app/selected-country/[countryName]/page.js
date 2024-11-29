"use server";

import {GrFormPreviousLink} from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import LeafletMap from "@/app/UI components/LeafletMap";
import CountryPageClient from "@/app/UI components/countryPageClient";



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

async function CountryPage({params}) {
    const {countryName} = await params;
    const borderCountries = [];
    const countryData =  await getCountryData(countryName);

    if (!countryData) {
        return <div>Country is not Found</div>
    }

    if (countryData[0].borders.length > 0) {
        for(let i = 0; i < countryData[0].borders.length; i++) {
            const borderCode = countryData[0].borders[i];
            const country = await getCountryDataByCode(borderCode);
            borderCountries.push({
                countryCode: borderCode,
                name: country[0].name.official
            });
        }
    }

    return (
        <CountryPageClient countryData={countryData} borderCountries={borderCountries} />
    )
}

export default CountryPage;