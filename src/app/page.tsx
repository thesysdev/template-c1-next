"use client";

import { C1Chat, ThemeProvider } from "@thesysai/genui-sdk";
import "@crayonai/react-ui/styles/index.css";
import { Theme } from "@crayonai/react-ui";
import clsx from "clsx";
import styles from "./page.module.scss";
import { useTheme } from "@crayonai/react-ui/ThemeProvider";

const theme = __THEME_CONFIG__ as Theme;

const ChatInternal = () => {
  const { portalThemeClassName } = useTheme();

  return (
    <>
      <style>{__CUSTOM_THEME_STYLE__}</style>
      <C1Chat apiUrl="/api/chat" />
    </>
  );
};

export default function Home() {
  return (
    <div className={clsx("!h-full !w-full", styles["chat-theme"])}>
      <ThemeProvider theme={theme}>
        <ChatInternal />
      </ThemeProvider>
    </div>
  );
}
