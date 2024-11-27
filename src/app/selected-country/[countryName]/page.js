"use server";

import {GrFormPreviousLink} from "react-icons/gr";

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

async function CountryPage({params}) {
    const {countryName} = params;

    const countryData =  await getCountryData(countryName);
    console.log(countryData)
    if (!countryData) {
        return <div>Country is not Found</div>
    }

    return (
        <div className="gap-8 flex flex-col pl-20 pr-20 py-20">
            <button className="flex items-center gap-2">
                <GrFormPreviousLink/>
                Back
            </button>
            <section className="flex items-center gap-10">
                <div>
                    <img className="w-full object-cover rounded-md" src={countryData[0].flags.png} alt={countryData[0].name.official} />
                </div>

                <div className="self-start pt-8">
                    <div className="flex flex-col pl-2 mt-2 gap-3">
                        <p className="font-nunito text-3xl dark:text-white transition-colors duration-500">
                            <strong>{countryData[0].name.official}</strong>
                        </p>
                        <div className="flex gap-[8px] flex-col">
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Native Name</strong>: {countryData[0].nativeName}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Population</strong>: {countryData[0].population}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Region</strong>: {countryData[0].region}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Capital</strong>: {countryData[0].capital}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CountryPage;