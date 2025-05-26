import { CardInfo } from "@/app/page";
import { ArrowRightIcon } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Loader } from "./Loader";
import { Button } from "@crayonai/react-ui";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface DashboardScreenProps {
  cardInfo: CardInfo[];
  loading: boolean;
  isPromptsFetchError?: boolean;
}

interface CardStreamingState {
  prompt: string;
  status: "streaming" | "done";
}

export const DashboardScreen = ({
  cardInfo,
  loading,
  isPromptsFetchError,
}: DashboardScreenProps) => {
  const [cardStreamingStates, setCardStreamingStates] = useState<
    CardStreamingState[]
  >([]);

  // state to set the initial streaming state for all cards
  useEffect(() => {
    if (!cardInfo || cardInfo.length === 0) return;
    if (cardStreamingStates.length > 0) return; // Only populate once

    setCardStreamingStates(
      cardInfo.map((card) => ({
        prompt: card.text,
        status: "streaming" as const,
      }))
    );
  }, [cardInfo, cardStreamingStates]);

  const markCardAsDone = useCallback(
    (prompt: string) => {
      setCardStreamingStates((prev) =>
        prev.map((card) =>
          card.prompt === prompt ? { ...card, status: "done" } : card
        )
      );
    },
    [setCardStreamingStates]
  );

  const allCardsDoneStreaming = cardStreamingStates.every(
    (card) => card.status === "done"
  );

  const noResponsesAvailable = cardInfo.length === 0 && !isPromptsFetchError;

  return (
    <m.div
      className="flex min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col w-full bg-black/1">
        <Header />

        <div className="flex flex-1 mt-[48px]">
          <Sidebar lowFidelity />

          <div className="flex-1 items-center justify-center p-4">
            {loading ? (
              <Loader />
            ) : isPromptsFetchError || noResponsesAvailable ? (
              <div className="flex flex-col gap-4 pt-[60px] pb-[100px] w-full h-full justify-center items-center">
                <p className="text-sm text-red-500/80">
                  {isPromptsFetchError
                    ? "There was an error fetching your data. Please try again."
                    : "It looks like your prompt didn't result in any data. Please try again with a different prompt."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-[60px] pb-[100px] max-w-full">
                <div className="columns-1 xl:columns-2 gap-4">
                  {cardInfo.map((card) => (
                    <div key={card.text} className="mb-4 break-inside-avoid">
                      <AnalyticsCard
                        prompt={card.text}
                        markCardAsDone={markCardAsDone}
                      />
                    </div>
                  ))}
                </div>
                <AnimatePresence>
                  {(allCardsDoneStreaming || isPromptsFetchError) && (
                    <m.div
                      key="footer"
                      className="text-center mt-[100px] flex flex-col items-center gap-[24px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <p className="text-sm text-gray-500">
                        This dashboard is powered by the C1 GenUI API <br /> and
                        uses sample data for demonstration purposes.
                      </p>
                      <Button
                        variant="secondary"
                        size="large"
                        iconRight={<ArrowRightIcon />}
                        onClick={() =>
                          window.open(
                            "https://docs.thesys.dev/guides/overview",
                            "_blank"
                          )
                        }
                      >
                        View Documentation
                      </Button>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
};
