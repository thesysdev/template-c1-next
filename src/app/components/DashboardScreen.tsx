import { CardInfo } from "@/app/page";
import { ArrowRightIcon, Search } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "@crayonai/react-ui";
import { useState } from "react";

interface DashboardScreenProps {
  cardInfo: CardInfo[];
  loading: boolean;
  generateCardsHandler: (
    e: React.FormEvent<HTMLFormElement>,
    prompt: string
  ) => Promise<void>;
}

export const DashboardScreen = ({
  cardInfo,
  generateCardsHandler,
  loading,
}: DashboardScreenProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    generateCardsHandler(e, prompt);
    setPrompt("");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (loading) return;
    setPrompt(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full bg-black/1">
        <Header lowFidelity />

        <div className="flex flex-1">
          <Sidebar lowFidelity />

          <div className="flex-1 items-center justify-center p-4">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="flex flex-col gap-4 pb-[100px]">
                <form onSubmit={handleSubmit} className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    placeholder="Ask anything about your data..."
                    value={prompt}
                    onChange={inputChangeHandler}
                    disabled={loading}
                  />
                </form>
                <div className="columns-2 gap-4">
                  {cardInfo.map((card) => (
                    <div key={card.text} className="mb-4 break-inside-avoid">
                      <AnalyticsCard prompt={card.text} />
                    </div>
                  ))}
                </div>

                <div className="text-center mt-[100px] flex flex-col items-center gap-[24px]">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
