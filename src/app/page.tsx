"use client";

import { ThemeProvider } from "@crayonai/react-ui";
import "@crayonai/react-ui/styles/index.css";
import { useState } from "react";
import { InputScreen } from "./components/InputScreen";
import { DashboardScreen } from "./components/DashboardScreen";

export interface CardInfo {
  text: string; // card prompt
  columns: number; // number of columns (of 12) the card should span
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<CardInfo[]>([]);

  const generateCardsHandler = async (
    e: React.FormEvent<HTMLFormElement>,
    prompt: string
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/cards", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data: { prompts: CardInfo[] } = await response.json();
      setCards(data.prompts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      {!cards.length ? (
        <InputScreen
          generateCardsHandler={generateCardsHandler}
          loading={loading}
        />
      ) : (
        <DashboardScreen
          cardInfo={cards}
          generateCardsHandler={generateCardsHandler}
          loading={loading}
        />
      )}
    </ThemeProvider>
  );
}
