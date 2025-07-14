import {
  Bitter,
  Crimson_Text,
  DM_Sans,
  Figtree,
  Inter,
  Manrope,
  Merriweather,
  Open_Sans,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Roboto,
  Space_Mono,
  Work_Sans,
  IBM_Plex_Serif,
  Geist,
  Host_Grotesk,
  Geist_Mono,
} from "next/font/google";

export const bitter = Bitter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bitter",
});

export const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-crimson-text",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const figtree = Figtree({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-figtree",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ibm-plex-serif",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-merriweather",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-open-sans",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-space-mono",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-work-sans",
});

export const geist = Geist({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-geist",
});

export const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-host-grotesk",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const fonts = [
  bitter,
  crimsonText,
  dmSans,
  figtree,
  ibmPlexSerif,
  inter,
  manrope,
  merriweather,
  openSans,
  playfairDisplay,
  plusJakartaSans,
  roboto,
  spaceMono,
  workSans,
  geist,
  hostGrotesk,
  geistMono,
];
