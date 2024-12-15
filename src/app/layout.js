
import './globals.css';
import DarkMode from "@/app/UI components/darkMode";
import { Nunito_Sans } from 'next/font/google';


const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-nunitoSans",
});

export const metadata = {
    title: "Countries REST API",
    description: "Main Page",
};

function RootLayout({children}) {
    return (
        <html lang="en" className={nunitoSans.className}>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
        <header className="transition-colors duration-500 inline-block w-full dark:bg-dark-bg dark:border-b-dark-bg bg-white border-b-[1.5px] border-b-grey-dark">
            <div className="max-md:px-4 pl-20 pr-20 my-7 flex justify-between items-center">
                <p className="font-nunito dark:text-white transition-colors duration-500">
                    <strong>Where in the World</strong>
                </p>
                <DarkMode />
            </div>
        </header>
        <main className="transition-colors duration-500 dark:bg-dark-bg-2 bg-grey-main w-full min-h-screen">{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;