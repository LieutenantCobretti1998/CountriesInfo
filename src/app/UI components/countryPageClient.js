"use client";

import Link from "next/link";
import {GrFormPreviousLink} from "react-icons/gr";
import Image from "next/image";
import dynamic from "next/dynamic";


const weatherIconsMap = {
    "Rain": <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="ionicon max-md:w-[10px] max-md:h-[10px]" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
              d="M120 352l-24 48M136 432l-16 32M400 352l-24 48M416 432l-16 32M208 304l-16 96h48v80l80-112h-48l16-64M404.33 152.89H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 00-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55z"/>
    </svg>,
    "Clear": <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="ionicon max-md:w-[16px] max-md:h-[16px]" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"
              d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"/>
        <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                strokeWidth="32"/>
    </svg>,
    "Clouds": <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="ionicon max-md:w-[16px] max-md:h-[16px]" viewBox="0 0 512 512">
        <path
            d="M100.18 241.19a15.93 15.93 0 0013.37-13.25C126.6 145.59 186.34 96 256 96c64.69 0 107.79 42.36 124.92 87a16.11 16.11 0 0012.53 10.18C449.36 202.06 496 239.21 496 304c0 66-54 112-120 112H116c-55 0-100-27.44-100-88 0-54.43 43.89-80.81 84.18-86.81z"
            fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/>
    </svg>,
    "Snow": <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="ionicon max-md:w-[16px] max-md:h-[16px]" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
              d="M256 32v448M313.72 80A111.47 111.47 0 01256 96a111.47 111.47 0 01-57.72-16M198.28 432a112.11 112.11 0 01115.44 0M449.99 144L62.01 368M437.27 218a112.09 112.09 0 01-57.71-100M74.73 294a112.09 112.09 0 0157.71 100M62.01 144l387.98 224M74.73 218a112.09 112.09 0 0057.71-100M437.27 294a112.09 112.09 0 00-57.71 100"/>
    </svg>
}


function CountryPageClient({countryData, borderCountries, zoomLevel, historicalEvents, wikiUrl, weatherData}) {
    const LeafletMap = dynamic(() => import('@/app/UI components/LeafletMap'), {
        ssr: false,
    });
    let nativeName = countryData[0]?.name;
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
            <div className="max-xs:flex-col max-xs:gap-10 max-xs:items-start flex justify-between items-center">
                <Link href="/">
                    <div className="cursor-pointer hover:-translate-y-1 dark:translate-y-0  dark:bg-grey-dark rounded-md dark:hover:bg-dark-bg-2 transition-all duration-300 w-min py-1 px-6 flex items-center gap-1">
                        <GrFormPreviousLink />
                        Back
                    </div>
                </Link>
                {weatherData.length !== 0 && (
                    <div className="bg-grey-dark h-15 p-4 rounded-md">
                        <article className="max-md:gap-4 bg-grey flex items-center gap-10 h-10">
                            {weatherData.map((forecast, index) => {
                                const original = forecast.dt_txt;
                                const weatherStatus = forecast.weather?.[0]?.main;
                                const icon = weatherIconsMap[weatherStatus] || null;
                                const datePart = original.split(' ')[0];
                                const [year, month, day] = datePart.split('-');
                                const monthDayFormat = `${month}/${day}`;
                                return (
                                    <div key={index} className="max-md:gap-1 flex flex-col justify-center items-center">
                                        <div className="max-md:text-[.5rem]">{monthDayFormat}</div>
                                        <div>{icon}</div>
                                    </div>
                                )
                            })}
                        </article>
                    </div>
                )}
            </div>
            <section className="max-xl:flex-col max-xl:items-start flex items-center gap-20">
                <div className="max-xl:max-w-[500px] max-xl:h-[300px] max-xs:max-w-[235px] max-xs:h-[200px] w-[560px] h-[401px]">
                    {countryData[0].flags ? (
                        <Image
                            width={560}
                            height={401}
                            quality={100}
                            priority={true}
                            className="w-full h-full object-cover rounded-md"
                            src={countryData[0].flags.png ? countryData[0].flags.png : countryData[0].flags.svg}
                            alt={countryData[0].flags.alt ? countryData[0].flags.alt :  countryData[0].name.official}
                        />
                    ): (
                        <p>No Flag image😒</p>
                    )}
                </div>

                <article className="max-md:flex-col flex gap-10">
                    <div className="max-md:pl-0 flex flex-col pl-2 mt-2 gap-5">
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
                    <div className="max-xl:pt-4 flex gap-[15px] flex-col self-center pt-14">
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
                <section className="max-xl:flex-col max-xl:justify-center flex gap-2">
                    <p className="font-nunito self-center text-sm dark:text-white transition-colors duration-500">
                        <strong>Border countries</strong>:
                    </p>
                    <article className="max-md:flex-wrap flex gap-5 justify-center items-center">
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
            {historicalEvents.length !== 0 && (
                <article className="max-xl:text-sm flex flex-col gap-10 pt-10">
                    <h2 className="dark:text-white self-center font-nunito font-bold text-xl">Interesting events</h2>
                    <ol className="list-decimal marker:font-bold space-y-4">
                        {historicalEvents?.map((event, index) => (
                            <li className="dark:text-white" key={index}>
                                {`${event.day}/${event.month}/${event.year}`}: {event.event}
                            </li>
                        ))}
                    </ol>
                    {wikiUrl && (
                        <Link target="_blank" rel="noopener noreferrer" className="max-md:text-[.7rem] self-center text-2xl font-bold" href={wikiUrl}>👉More information about {countryData[0].name.common}👈</Link>
                    )}
                </article>
            )}
        </div>
    );
}

export default CountryPageClient;