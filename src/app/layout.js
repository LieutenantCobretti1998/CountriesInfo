
import './globals.css';
import DarkMode from "@/app/UI components/darkMode";

function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Country Information Website</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
                rel="stylesheet"/>
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