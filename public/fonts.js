
import localFont from "next/font/local";
import { Montserrat, Open_Sans } from "next/font/google";

export const montserrat = Montserrat({ subsets: ["latin"], weight: "400", });
export const montserratItalic = Montserrat({ subsets: ["latin"], weight: "400", style: ['italic'] });
export const montserratBold = Montserrat({ subsets: ["latin"], weight: "500"});
export const montserratExtraBold = Montserrat({ subsets: ["latin"], weight: "800"});
export const montserratLight = Montserrat({ subsets: ["latin"], weight: "300"});
export const cooperHewitt = localFont({ src: "../public/CooperHewitt-Heavy.otf" });
export const glacial = localFont({ src: "../public/GlacialIndifference-Regular.otf" });
export const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
