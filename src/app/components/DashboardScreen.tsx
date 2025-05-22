import { CardInfo } from "@/app/page";
import { AnalyticsCard } from "./AnalyticsCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";

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
  console.log("re-rendering dashboard screen");

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full">
        <Header
          generateCardsHandler={generateCardsHandler}
          loading={loading}
          lowFidelity
        />

        <div className="flex flex-1">
          <Sidebar lowFidelity />

          {loading ? (
            <div className="flex-1 items-center justify-center p-4">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="flex-1 items-center justify-center p-4">
              <div className="columns-2 gap-4">
                {cardInfo.map((card) => (
                  <div key={card.text} className="mb-4 break-inside-avoid">
                    <AnalyticsCard prompt={card.text} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
