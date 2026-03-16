import { Syne, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    weight: ["400", "500", "600", "700", "800"]
})

export const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    weight: ["300", "400", "500", "600", "700"]
})

export const roxter = localFont({
    src: [
        {
            weight: "400",
            path: "../public/fonts/Rostex.ttf",
            style: "normal"
        }
    ],
    variable: "--font-roxter"
})

export const streach = localFont({
    src: [
        {
            weight: "400",
            path: "../public/fonts/Stretch.otf",
            style: "normal"
        }
    ],
    variable: "--font-streach"
})
