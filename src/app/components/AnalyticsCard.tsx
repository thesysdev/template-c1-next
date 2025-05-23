import { useEffect } from "react";
import { useUIState } from "../hooks/useUIState";
import { C1Component } from "@thesysai/genui-sdk";

interface AnalyticsCardProps {
  prompt: string;
  markCardAsDone: (prompt: string) => void;
}

export const AnalyticsCard = ({
  prompt,
  markCardAsDone,
}: AnalyticsCardProps) => {
  const { state, actions } = useUIState();

  useEffect(() => {
    if (state.c1Response && state.c1Response.length > 0 && !state.isLoading) {
      markCardAsDone(prompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markCardAsDone, state.c1Response, state.isLoading]);

  useEffect(() => {
    if (!prompt) return;
    actions.makeApiCall(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  return (
    <C1Component c1Response={state.c1Response} isStreaming={state.isLoading} />
  );
};
