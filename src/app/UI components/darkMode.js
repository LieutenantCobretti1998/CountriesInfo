"use client";

import {useEffect, useState} from "react";

function DarkMode() {
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    return (
        <button aria-label="Toggle Dark Mode" onClick={toggleDarkMode} className="flex gap-3 items-center hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
            {isDarkMode ? (
                <>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="ionicon w-[15px] h-[15px]" viewBox="0 0 512 512">
                        <path
                            className="dark:fill-white dark:stroke-white"
                            d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
                            fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="32"/>
                    </svg>
                    <p className="transition-colors duration-500 font-nunito dark:text-white">Dark Mode</p>
                </>
            ): (
                <>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="ionicon w-[15px] h-[15px]" viewBox="0 0 512 512">
                        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                              strokeWidth="32"
                              d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"/>
                        <circle cx="256" cy="256" r="80" stroke="currentColor" strokeLinecap="round"
                                strokeMiterlimit="10" strokeWidth="32"/>
                    </svg>
                    <p className="transition-colors duration-500 font-nunito">Light Mode</p>
                </>
            )}
        </button>
    );
}

export default DarkMode;