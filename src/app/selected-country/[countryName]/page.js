"use server";

import {GrFormPreviousLink} from "react-icons/gr";
import Link from "next/link";

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
    console.log(countryName)
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

    let nativeName = countryData[0].name;
    const currencies = countryData[0].currencies;
    const firstCurrency = Object.values(currencies)[0];
    const currencyName = firstCurrency.name;
    const currencySymbol = firstCurrency.symbol;
    if( nativeName.nativeName) {
        const firstObject = Object.values(nativeName.nativeName)[0];
        nativeName = firstObject.common || firstObject.official;
    }


    return (
        <div className="gap-10 flex flex-col pl-20 pr-20 py-20">
            <button className="flex items-center gap-2">
                <GrFormPreviousLink/>
                Back
            </button>
            <section className="flex items-center gap-20">
                <div className="w-[560px] h-[401px]">
                    <img className="w-full object-cover rounded-md" src={countryData[0].flags.png}
                         alt={countryData[0].name.official}/>
                </div>

                <article className="flex gap-10">
                            <div className="flex flex-col pl-2 mt-2 gap-5">
                                <p className="font-nunito text-3xl dark:text-white transition-colors duration-500">
                                    <strong>{countryData[0].name.official}</strong>
                                </p>
                                <div className="flex gap-[15px] flex-col">
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Native Name</strong>: {nativeName}
                                    </p>
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Capital</strong>: {countryData[0].capital[0]}
                                    </p>
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Region</strong>: {countryData[0].region}
                                    </p>
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Subregion</strong>: {countryData[0].subregion}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-[15px] flex-col self-center pt-14">
                                <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                    <strong>Top level domain</strong>: {countryData[0].tld[0]}
                                </p>
                                <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                    <strong>Currency</strong>: {currencyName} {currencySymbol}
                                </p>
                                <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                    <strong>Languages</strong>: {Object.values(countryData[0].languages).join(", ")}
                                </p>
                                <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                    <strong>TimeZones</strong>: {countryData[0].timezones.join(", ")}
                                </p>
                            </div>
                </article>
            </section>
            {countryData[0].borders.length > 0 && (
                <section className="flex gap-10">
                    <p className="font-nunito self-center text-sm dark:text-white transition-colors duration-500">
                        <strong>Border countries</strong>:
                    </p>
                    <article className="flex gap-5 justify-center items-center">
                        {borderCountries.map((border, index) => (
                            <Link href={`/selected-country/${encodeURIComponent(border.name)}`} key={index}>
                                <p className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    {border.countryCode}
                                </p>
                            </Link>
                        ))}
                    </article>
                </section>
            )}
        </div>
    )
}

export default CountryPage;