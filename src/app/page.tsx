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
  fontHeadingLarge: `600 16px/20px __FONT__`,
  fontHeadingMedium: `600 16px/20px __FONT__`,
  fontHeadingSmall: `600 16px/20px __FONT__`,
  fontTitle: `500 16px/20px __FONT__`,
  fontTitleMedium: `500 16px/20px __FONT__`,
  fontTitleSmall: `500 16px/20px __FONT__`,
  fontBody: `400 16px/20px __FONT__`,
  fontBodyMedium: `400 16px/20px __FONT__`,
  fontBodySmall: `400 16px/20px __FONT__`,
  fontBodyHeavy: `600 16px/20px __FONT__`,
  fontBodySmallHeavy: `600 16px/20px __FONT__`,
  fontBodyLink: `500 16px/20px __FONT__`,
  fontLabelLarge: `400 16px/20px __FONT__`,
  fontLabelLargeHeavy: `500 16px/20px __FONT__`,
  fontLabel: `400 16px/20px __FONT__`,
  fontLabelHeavy: `500 16px/20px __FONT__`,
  fontLabelMedium: `400 16px/20px __FONT__`,
  fontLabelMediumHeavy: `600 16px/20px __FONT__`,
  fontLabelSmall: `400 16px/20px __FONT__`,
  fontLabelSmallHeavy: `500 16px/20px __FONT__`,
  fontLabelExtraSmall: `400 16px/20px __FONT__`,
  fontLabelExtraSmallHeavy: `500 16px/20px __FONT__`,
})

export default function Home() {
  return <C1Chat 
    apiUrl="/api/chat"
    theme={{ theme: `__THEME_CONFIG__` as Theme, ...generateTypography() }}
  />;
}
