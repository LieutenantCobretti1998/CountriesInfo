"use client";

import Link from "next/link";
import {GrFormPreviousLink} from "react-icons/gr";
import Image from "next/image";
import dynamic from "next/dynamic";



function CountryPageClient({countryData, borderCountries}) {
    const LeafletMap = dynamic(() => import('@/app/UI components/LeafletMap'), {
        ssr: false,
    });
    console.log(countryData)
    let nativeName = countryData[0].name;
    const coordinates = countryData[0].latlng;
    const currencies = countryData[0].currencies;
    const firstCurrency = currencies ? Object.values(currencies)[0] : null;
    const currencyName = firstCurrency ? firstCurrency.name : 'N/A';
    const currencySymbol = firstCurrency ? firstCurrency.symbol : 'N/A';

    if (nativeName.nativeName) {
        const firstObject = Object.values(nativeName.nativeName)[0];
        nativeName = firstObject.common || firstObject.official;
    }

    return (
        <div className="gap-10 flex flex-col pl-20 pr-20 py-20">
            <button className="flex items-center gap-2">
                <GrFormPreviousLink />
                Back
            </button>
            <section className="flex items-center gap-20">
                <div className="w-[560px] h-[401px]">
                    <Image
                        width={560}
                        height={401}
                        quality={100}
                        priority={true}
                        className="w-full h-full object-cover rounded-md"
                        src={countryData[0].flags.png}
                        alt={countryData[0].name.official}
                    />
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
                            <strong>Top level domain</strong>:{' '}
                            {countryData[0].tld && countryData[0].tld[0]
                                ? countryData[0].tld[0]
                                : 'N/A'}
                        </p>
                        <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                            <strong>Currency</strong>: {currencyName} {currencySymbol}
                        </p>
                        <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                            <strong>Languages</strong>:{' '}
                            {Object.values(countryData[0].languages).join(', ')}
                        </p>
                        <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                            <strong>TimeZones</strong>:{' '}
                            {countryData[0].timezones.join(', ')}
                        </p>
                    </div>
                </article>
            </section>
            {countryData[0].borders && countryData[0].borders.length > 0 && (
                <section className="flex gap-10">
                    <p className="font-nunito self-center text-sm dark:text-white transition-colors duration-500">
                        <strong>Border countries</strong>:
                    </p>
                    <article className="flex gap-5 justify-center items-center">
                        {borderCountries.map((border, index) => (
                            <Link
                                href={`/selected-country/${encodeURIComponent(border.name)}`}
                                key={index}
                            >
                                <p className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    {border.countryCode}
                                </p>
                            </Link>
                        ))}
                    </article>
                </section>
            )}
            <LeafletMap id={countryData[0].name.official} coordinates={coordinates} />
        </div>
    );
}

export default CountryPageClient;