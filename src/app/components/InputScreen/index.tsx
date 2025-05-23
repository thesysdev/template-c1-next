import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface InputScreenProps {
  loading: boolean;
  titleRef: React.RefObject<HTMLDivElement | null>;
}

export const InputScreen = ({ loading, titleRef }: InputScreenProps) => {
  return (
    <motion.div
      className="flex flex-col justify-center h-screen w-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {!loading && (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
          <Image
            src="/background.svg"
            alt="background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>
      )}

      <div
        className="flex flex-col items-center justify-center relative z-10"
        style={{
          gap: `${16 + 42 + 16}px`,
        }}
      >
        <div className="flex -translate-y-[16px]" ref={titleRef}>
          <Image
            src="/page-title.svg"
            alt="Thesys Logo"
            width={300}
            height={100}
            priority
          />
        </div>
        <div className={`flex items-center gap-[0.5ch] -translate-y-[16px]`}>
          <Image
            src="/lab-flask.svg"
            alt="Thesys Logo"
            width={16}
            height={16}
            priority
          />
          <p className="text-black/40 text-sm flex items-center gap-[0.5ch]">
            This is an experiment built in{" "}
            <span
              className="text-black text-sm cursor-pointer flex items-center gap-[0.5ch] hover:underline"
              onClick={() => {
                window.open("https://github.com/thesysdev/examples", "_blank");
              }}
            >
              Thesys Demos
              <ArrowRight size={16} />
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
