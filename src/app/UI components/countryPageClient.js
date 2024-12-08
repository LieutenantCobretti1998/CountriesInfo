"use client";

import Link from "next/link";
import {GrFormPreviousLink} from "react-icons/gr";
import Image from "next/image";
import dynamic from "next/dynamic";



function CountryPageClient({countryData, borderCountries, zoomLevel, historicalEvents, wikiUrl}) {
    const LeafletMap = dynamic(() => import('@/app/UI components/LeafletMap'), {
        ssr: false,
    });
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
        <div className="gap-10 flex flex-col pl-20 pr-20 py-20 dark:text-white transition-colors duration-300 ">
            <Link href="/">
                <div className="cursor-pointer hover:-translate-y-1 dark:translate-y-0  dark:bg-grey-dark rounded-md dark:hover:bg-dark-bg-2 transition-all duration-300 w-min py-1 px-6 flex items-center gap-1">
                    <GrFormPreviousLink />
                    Back
                </div>
            </Link>
            <section className="flex items-center gap-20">
                <div className="w-[560px] h-[401px]">
                    {countryData[0].flags ? (
                        <Image
                            width={560}
                            height={401}
                            quality={100}
                            priority={true}
                            className="w-full h-full object-cover rounded-md"
                            src={countryData[0].flags.png ? countryData[0].flags.png:countryData[0].flags.svg }
                            alt={countryData[0].flags.alt ? countryData[0].flags.alt :  countryData[0].name.official}
                        />
                    ): (
                        <p>No Flag image😒</p>
                    )}
                </div>

                <article className="flex gap-10">
                    <div className="flex flex-col pl-2 mt-2 gap-5">
                        <p className="font-nunito text-3xl dark:text-white transition-colors duration-500">
                            <strong>{countryData[0].name.official ? countryData[0].name.official: "N/A"}</strong>
                        </p>
                        <div className="flex gap-[15px] flex-col">
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Native Name</strong>: {nativeName}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Capital</strong>: {countryData[0].capital ? countryData[0].capital[0]: "N/A"}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Region</strong>: {countryData[0].region ? countryData[0].region : "N/A"}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Subregion</strong>: {countryData[0].subregion ? countryData[0].subregion : "N/A"}
                            </p>
                            <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                <strong>Area</strong>: {countryData[0].area ? countryData[0].area.toLocaleString() : "N/A"}
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
                        <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                            <strong>Population</strong>: {countryData[0].population ? countryData[0].population.toLocaleString() : "N/A"}
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
                                <p className="dark:text-white px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    {border.countryCode}
                                </p>
                            </Link>
                        ))}
                    </article>
                </section>
            )}
            <LeafletMap zoom={zoomLevel} id={countryData[0].name.official} coordinates={coordinates}/>
            <article className="flex flex-col gap-10 pt-10">
                <h2 className="dark:text-white self-center font-nunito font-bold text-xl">Interesting events</h2>
                <ol className="list-decimal marker:font-bold">
                    {historicalEvents?.map((event, index) => (
                        <li className="dark:text-white" key={index}>
                            {`${event.day}/${event.month}/${event.year}`}: {event.event}
                        </li>
                    ))}
                </ol>
                {wikiUrl && (
                    <Link target="_blank" rel="noopener noreferrer" className="self-center text-2xl font-bold" href={wikiUrl}>👉More information about {countryData[0].name.common}👈</Link>
                )}
            </article>
        </div>
    );
}

export default CountryPageClient;