import { useEffect } from "react";
import { useUIState } from "../hooks/useUIState";
import { C1Component } from "@thesysai/genui-sdk";

interface AnalyticsCardProps {
  prompt: string;
}

export const AnalyticsCard = ({ prompt }: AnalyticsCardProps) => {
  const { state, actions } = useUIState();

  useEffect(() => {
    if (!prompt) return;
    actions.makeApiCall(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return (
    <C1Component c1Response={state.c1Response} isStreaming={state.isLoading} />
  );
};
