import localFont from "next/font/local";
import { Montserrat, Open_Sans } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: "auto",
  adjustFontFallback: false,
});
export const montserratItalic = Montserrat({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "auto",
  adjustFontFallback: false,
});
export const montserratBold = Montserrat({
  subsets: ["latin"],
  weight: "500",
  display: "auto",
  adjustFontFallback: false,
});
export const montserratExtraBold = Montserrat({
  subsets: ["latin"],
  weight: "800",
  display: "auto",
  adjustFontFallback: false,
});
export const montserratLight = Montserrat({
  subsets: ["latin"],
  weight: "300",
  display: "auto",
  adjustFontFallback: false,
});
export const cooperHewitt = localFont({
  src: "public/CooperHewitt-Heavy.otf",
  display: "auto",
  adjustFontFallback: false,
});
export const glacial = localFont({
  src: "public/GlacialIndifference-Regular.otf",
  display: "auto",
  adjustFontFallback: false,
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "auto",
  adjustFontFallback: false,
});
