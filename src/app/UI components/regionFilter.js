"use client";


import {useState} from "react";

function RegionFilter({changeRegion}) {
    const [selectedRegion, setSelectedRegion] = useState("");

    const handleSelectRegion = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        changeRegion(region);
    }

    return (
        <div>
            <select className="focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer rounded-md p-3 h-15"
                    name="regionFilter" value={selectedRegion} onChange={handleSelectRegion}>
                <option value="">Filter by Region</option>
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