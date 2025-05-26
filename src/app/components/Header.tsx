import React from "react";
import Image from "next/image";
import { Button } from "@crayonai/react-ui";
import { Github, ArrowRight } from "lucide-react";


const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-30 bg-container">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/thesys-navbar.svg"
            alt="Chat with C1"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <div className="flex items-center">
            <h1 className="text-primary">
              Analytics + C1 <span className="text-secondary">by thesys</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="medium"
            onClick={() =>
              window.open(
                "https://github.com/thesysdev/analytics-with-c1",
                "_blank"
              )
            }
          >
            <Github className="h-4 w-4" />
            <span className="hidden md:block">Github</span>
          </Button>
          <Button
            variant="secondary"
            size="medium"
            onClick={() =>
              window.open("https://docs.thesys.dev/welcome", "_blank")
            }
          >
            <span className="block md:hidden">Build</span>
            <span className="hidden md:block">Build with Thesys</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
