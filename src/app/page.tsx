"use client";

import { C1Chat, ThemeProvider } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";
import clsx from "clsx";
import styles from "./page.module.scss";
import { useTheme } from "@crayonai/react-ui/ThemeProvider";
import { theme, darkTheme, themeMode } from "@/theme";

// const ChatInternal = () => {
//   const { portalThemeClassName } = useTheme();

//   return (
//     <>
//       <style>{__CUSTOM_THEME_STYLE__}</style>
//       <C1Chat apiUrl="/api/chat" />
//     </>
//   );
// };

export default function Home() {
  const { portalThemeClassName } = useTheme();

  return (
    <div className={clsx("!h-full !w-full", styles["chat-theme"])}>
      <ThemeProvider theme={theme} darkTheme={darkTheme} mode={themeMode}>
        <style>{__CUSTOM_THEME_STYLE__}</style>
        <C1Chat apiUrl="/api/chat" />
      </ThemeProvider>
    </div>
  );
}
