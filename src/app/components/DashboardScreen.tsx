import { CardInfo } from "@/app/page";
import { ArrowRightIcon } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "@crayonai/react-ui";

interface DashboardScreenProps {
  cardInfo: CardInfo[];
  loading: boolean;
  resultsContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const DashboardScreen = ({
  cardInfo,
  loading,
  resultsContainerRef,
}: DashboardScreenProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col w-full bg-black/1">
        <Header lowFidelity />

        <div className="flex flex-1">
          <Sidebar lowFidelity />

          <div
            className="flex-1 items-center justify-center p-4"
            ref={resultsContainerRef}
          >
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="flex flex-col gap-4 pt-[58px] pb-[100px]">
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
