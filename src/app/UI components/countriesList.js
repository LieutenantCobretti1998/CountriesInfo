"use client";

import {useState} from "react";
import {GrFormNextLink, GrFormPreviousLink} from "react-icons/gr";
import {useRouter} from "next/navigation";

function CountriesList({countries}) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 8;
    const totalPages = Math.ceil(countries.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const currentCountries = countries.slice(startIndex, startIndex + itemPerPage);
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(window.location.search);
        params.set("page", pageNumber);
        router.push(`?${params.toString()}`);
    }
        return (
            <div className="flex flex-col gap-8">
                <section className="grid grid-cols-4 pl-20 gap-9">
                    {currentCountries.map((country) => (
                        <a key={country.cca2} href="#"
                           className="flex shadow-sm flex-col rounded-md w-[16.5rem] h-72  bg-white hover:scale-95 transition-all duration-500 dark:bg-dark-bg">
                            <div className="w-full h-40 overflow-hidden">
                                <img className="h-full w-full object-cover" src={country.flags.svg}
                                     alt={country.name.official}/>
                            </div>
                            <div className="flex flex-col  pl-2 mt-2 gap-3">
                                <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                    <strong>{country.name.official}</strong></p>
                                <div className="flex gap-[8px] flex-col">
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Population</strong>: {country.population}</p>
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Region</strong>: {country.region}</p>
                                    <p className="font-nunito text-sm dark:text-white transition-colors duration-500">
                                        <strong>Capital</strong>: {country.capital}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </section>
                <div className="col-start-4 flex justify-start gap-8 mb-6 self-end pr-20">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                            className="flex gap-3 items-center px-3 py-2 ml-2 bg-white rounded hover:bg-gray-300 disabled:bg-grey-main disabled:cursor-not-allowed transition-colors duration-300">
                        Previous
                        <GrFormPreviousLink/>
                    </button>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                            className="flex gap-3 items-center px-3 py-2 ml-2 bg-white rounded hover:bg-gray-300 disabled:bg-grey-main disabled:cursor-not-allowed transition-colors duration-300">
                        Next
                        <GrFormNextLink/>
                    </button>
                </div>
            </div>
)
    ;
}

export default CountriesList;