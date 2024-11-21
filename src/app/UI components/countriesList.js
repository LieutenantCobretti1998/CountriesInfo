"use client";



import {useEffect, useState} from "react";
import {NextResponse as response} from "next/server";
import {error} from "next/dist/build/output/log";

function CountriesList({countries}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;


    const totalPages = Math.ceil(countries.length / itemPerPage);

    const startIndex = (currentPage - 1) * itemPerPage;
    const currentCountries = countries.slice(startIndex, startIndex + itemPerPage);
    console.log(currentCountries);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
        return (
            <section className="grid grid-cols-4 pl-20 gap-9">
                {currentCountries.map((country) => (
                        <a key={country.cca2} href="#" className="flex shadow-sm flex-col rounded-md w-[16.5rem] bg-white dark:bg-dark-bg transition-colors duration-500">
                            <div className="w-full h-40 overflow-hidden">
                                <img className="h-full w-full object-cover" src={country.flags.svg} alt={country.name.official}/>
                            </div>
                            <div className="flex flex-col  pl-2 mt-2 gap-3">
                                <p className="font-nunito dark:text-white transition-colors duration-500"><strong>{country.name.official}</strong></p>
                                <div className="flex gap-1 flex-col">
                                    <p className="font-nunito dark:text-white transition-colors duration-500"><strong>Population</strong>: {country.population}</p>
                                    <p className="font-nunito dark:text-white transition-colors duration-500"><strong>Region</strong>: {country.region}</p>
                                    <p className="font-nunito dark:text-white transition-colors duration-500"><strong>Capital</strong>: {country.capital}</p>
                                </div>
                            </div>
                        </a>
                ))}
            </section>
        );
}

export default CountriesList;