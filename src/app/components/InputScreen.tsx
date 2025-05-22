import { Button } from "@crayonai/react-ui";
import { Clapperboard, LoaderCircle } from "lucide-react";
import { useState } from "react";

interface InputScreenProps {
  generateCardsHandler: (
    e: React.FormEvent<HTMLFormElement>,
    prompt: string
  ) => Promise<void>;
  loading: boolean;
}

export const InputScreen = ({
  generateCardsHandler,
  loading,
}: InputScreenProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateCardsHandler(e, prompt);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-8">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg shadow-2xl transform hover:scale-105 transition-transform"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center max-w-2xl w-full px-4 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-red-950 rounded-full flex items-center justify-center">
            <Clapperboard className="h-6 w-6 text-gray-200" />
          </div>
          <h1 className="text-4xl font-semibold mb-0 tracking-tight text-center bg-gradient-to-r from-gray-800 via-red-900 to-gray-800 text-transparent bg-clip-text">
            Streamovie Analytics
          </h1>
        </div>
        <p className="text-gray-800 text-center mb-8 max-w-lg">
          Ask questions about your movie streaming platform&apos;s performance
          using natural language
        </p>
        <div className="w-full bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full h-32 p-4 text-black bg-white/5 border border-white/10 rounded-xl resize-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all outline-none placeholder-gray-400"
              placeholder="Try asking something like: 'What were the top performing movies last month?' or 'Show me viewer engagement trends'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="px-6 py-2 text-sm font-medium flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Generate Insights</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
