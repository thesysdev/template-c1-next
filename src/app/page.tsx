"use client";

import { C1Chat } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";
import { Theme, themePresets } from "@crayonai/react-ui";

export type ThemeFont =
  | 'Inter'
  | 'Roboto'
  | 'Plus Jakarta Sans'
  | 'Open Sans'
  | 'Bitter'
  | 'Merriweather'
  | 'Playfair Display'
  | 'Crimson Text'
  | 'Geist'
  | 'Figtree'
  | 'Manrope'
  | 'Work Sans'
  | 'DM Sans'
  | 'IBM Plex Serif'
  | 'Space Mono'
  | 'Geist Mono'
  | 'Host Grotesk'

const generateTypography = () => ({
  fontPrimary: `400 16px/20px __FONT__`,
  fontHeadingLarge: `600 28px/32.2px __FONT__`,
  fontHeadingMedium: `600 24px/27.6px __FONT__`,
  fontHeadingSmall: `500 18px/22.5px __FONT__`,
  fontTitle: `500 16px/20px __FONT__`,
  fontTitleMedium: `500 16px/20px __FONT__`,
  fontTitleSmall: `500 16px/20px __FONT__`,
  fontBody: `400 16px/24px __FONT__`,
  fontBodyLargeHeavy: `500 18px/27px __FONT__`,
  fontBodyLarge: `400 18px/27px __FONT__`,
  fontBodyMedium: `400 16px/20px __FONT__`,
  fontBodySmall: `400 14px/21px __FONT__`,
  fontBodyHeavy: `500 16px/24px __FONT__`,
  fontBodySmallHeavy: `600 16px/20px __FONT__`,
  fontBodyLink: `500 16px/24px __FONT__`,
  fontLabelLarge: `400 16px/19.2px __FONT__`,
  fontLabelLargeHeavy: `500 16px/19.2px __FONT__`,
  fontLabel: `400 14px/16.8px __FONT__`,
  fontLabelHeavy: `500 14px/16.8px __FONT__`,
  fontLabelMedium: `400 16px/20px __FONT__`,
  fontLabelMediumHeavy: `600 16px/20px __FONT__`,
  fontLabelSmall: `400 12px/14.4px __FONT__`,
  fontLabelSmallHeavy: `500 12px/14.4px __FONT__`,
  fontLabelExtraSmall: `400 10px/12px __FONT__`,
  fontLabelExtraSmallHeavy: `500 10px/12px __FONT__`,
  shadowS: "0px 1px 2px rgba(0, 0, 0, 0.04)",
  shadowM: "0px 4px 6px rgba(0, 0, 0, 0.04)",
  shadowL: "0px 1px 8px rgba(0, 0, 0, 0.08)",
  shadowXl: "0px 10px 15px rgba(0, 0, 0, 0.1)",
})

export default function Home() {
  return <C1Chat 
    apiUrl="/api/chat"
    theme={{ theme: `__THEME_CONFIG__` as Theme, ...generateTypography() }}
  />;
}
