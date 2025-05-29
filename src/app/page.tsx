"use client";

import { ThemeProvider } from "@crayonai/react-ui";
import "@crayonai/react-ui/styles/index.css";
import { useState, useRef, useEffect } from "react";
import { InputScreen } from "./components/InputScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { InputField } from "./components/InputField/InputField";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";
import Header from "./components/Header";

export interface CardInfo {
  text: string; // card prompt
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [isPromptsFetchError, setIsPromptsFetchError] = useState(false);
  const [prompt, setPrompt] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);
  const [inputTop, setInputTop] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const updateInputPosition = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        setInputTop(titleRect.bottom + 16);
      }
    };

    updateInputPosition();
    window.addEventListener("resize", updateInputPosition);
    return () => window.removeEventListener("resize", updateInputPosition);
  }, []);

  const generateCardsHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    prompt: string
  ) => {
    e.preventDefault();
    try {
      setIsSubmitted(true);
      setLoading(true);
      const response = await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      console.log("response: ", response);
      const data: { prompts: CardInfo[] } = await response.json();
      console.log("parsed response: ", data);
      setCards(data.prompts);
    } catch (error) {
      console.error(
        "Something went wrong while fetching or parsing the list of prompts: ",
        error
      );
      setIsPromptsFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider mode="light">
        <Header />
        <InputField
          handleSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            generateCardsHandler(e, prompt)
          }
          value={prompt}
          onChange={setPrompt}
          placeholder="Search anything..."
          top={inputTop}
          translated={isSubmitted}
        />
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <InputScreen
              key="input-screen"
              loading={loading}
              titleRef={titleRef}
            />
          ) : (
            <DashboardScreen
              key="dashboard-screen"
              cardInfo={cards}
              loading={loading}
              isPromptsFetchError={isPromptsFetchError}
            />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </LazyMotion>
  );
}
