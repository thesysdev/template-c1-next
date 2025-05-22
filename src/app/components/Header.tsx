import React, { useState, useEffect } from "react";
import { Bell, ChevronDown, Search, Settings, User } from "lucide-react";
import Link from "next/link";

const Header: React.FC<{
  generateCardsHandler: (
    e: React.FormEvent<HTMLFormElement>,
    prompt: string
  ) => Promise<void>;
  loading: boolean;
}> = ({ generateCardsHandler, loading }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-full px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" onClick={() => window.location.reload()}>
              <h1 className="text-xl font-semibold text-gray-900">
                Marketing Analytics
              </h1>
            </Link>
          </div>

          <div className="hidden md:block w-1/3">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  placeholder="Ask anything about your data..."
                  value={prompt}
                  onChange={inputChangeHandler}
                  disabled={loading}
                />
              </form>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              <Bell size={20} />
            </button>
            <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
              <Settings size={20} />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium">
                John Smith
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
