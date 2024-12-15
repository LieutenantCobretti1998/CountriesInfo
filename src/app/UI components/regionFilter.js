"use client";


import {useState} from "react";

function RegionFilter({changeRegion, selectedRegion}) {
    console.log(selectedRegion)

    const handleSelectRegion = (event) => {
        const region = event.target.value;
        changeRegion(region);
    }

    return (
        <div>
            <select className="max-md:text-xs focus:outline-none focus:ring-2 dark:text-white dark:bg-dark-bg transition-colors duration-500 focus:ring-blue-500 cursor-pointer rounded-md p-3 h-15"
                    name="regionFilter" value={selectedRegion} onChange={handleSelectRegion}>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctic">Antarctic</option>
            </select>
        </div>
    );
}

export default RegionFilter;