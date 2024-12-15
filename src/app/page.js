"use client";
import {useEffect, useState} from "react";
import CountriesList from "@/app/UI components/countriesList";
import Spinner from "@/app/UI components/spinner";
import RegionFilter from "@/app/UI components/regionFilter";


function HomePage() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("Europe");
    const [selectedCountry, setSelectedCountry] = useState("");

    // Fetch countries dynamically based on region
    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true);
            setError(null);

            try {
                let endpoint = "/api/countries";

                if (selectedCountry) {
                    endpoint = `/api/countries?search=${encodeURIComponent(selectedCountry)}`;
                } else if (selectedRegion) {
                    endpoint = `/api/countries?region=${encodeURIComponent(selectedRegion)}`;
                }

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error("Failed to fetch countries");
                }

                const data = await response.json();
                setCountries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, [selectedRegion, selectedCountry]);

    const handleRegionChange = (selectedRegion) => {
        setSelectedRegion(selectedRegion);
        setSelectedCountry("");
    };

    const handleSearch = (event) => {
        const searchedCountry = event.target.value;

        if (!searchedCountry.trim()) {
            setSelectedRegion("Europe");
            setSelectedCountry("");
        } else {
            setSelectedRegion("Europe");
            setSelectedCountry(searchedCountry);
        }
    }

    return (
        <>
            <section className="max-md:px-4 flex pl-20 pr-20 py-20">
                <div className="flex-grow">
                    <div className="flex max-md:flex-col max-md:gap-4 max-md:items-start items-center justify-between">
                        <input value={selectedCountry} onChange={handleSearch} className="max-md:w-full dark:text-white transition-colors duration-500 dark:bg-dark-bg pl-8 py-2 relative rounded-md w-1/3  focus:outline-none focus:ring-2 focus:ring-blue-500" name="searchCountries" placeholder="Search a country here... "/>
                        <svg xmlns="http://www.w3.org/2000/svg" className="max-md:top-[11rem] max-md:left-[1.5rem] ionicon w-[15px] h-[15px] absolute left-[5.5rem]"
                             viewBox="0 0 512 512">
                            <path className="dark:fill-white" d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none"
                                  stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
                            <path className="dark:stroke-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                  strokeWidth="32" d="M338.29 338.29L448 448"/>
                        </svg>
                        <RegionFilter changeRegion={handleRegionChange} selectedRegion={selectedRegion} />
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : <CountriesList countries={countries} />}
        </>
    );
}

export default HomePage;