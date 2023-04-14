
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({ subsets: ["latin"], weight: "400", });
export const montserratItalic = Montserrat({ subsets: ["latin"], weight: "400", style: ['italic'] });
export const montserratBold = Montserrat({ subsets: ["latin"], weight: "500"});
export const cooperHewitt = localFont({ src: "../public/CooperHewitt-Heavy.otf" });
export const glacial = localFont({ src: "../public/GlacialIndifference-Regular.otf" });
