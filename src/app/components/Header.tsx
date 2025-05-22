import React, { useState, useEffect } from "react";
import { Bell, ChevronDown, Settings, User } from "lucide-react";
import Link from "next/link";
import { SkeletonCircle, SkeletonPill } from "./LowFidelityComponents";

interface HeaderProps {
  lowFidelity?: boolean;
}

const Header: React.FC<HeaderProps> = ({ lowFidelity }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full transition-all duration-300 border-b border-gray-200 bg-white ${
        isScrolled ? "shadow-sm" : ""
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

          <div className="hidden md:block w-1/2">
            <div className="relative w-full"></div>
          </div>

          <div className="flex items-center space-x-4">
            {lowFidelity ? (
              <SkeletonCircle />
            ) : (
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                <Bell size={20} />
              </button>
            )}
            {lowFidelity ? (
              <SkeletonCircle />
            ) : (
              <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none">
                <Settings size={20} />
              </button>
            )}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} />
              </div>

              {lowFidelity ? (
                <div className="w-24">
                  <SkeletonPill />
                </div>
              ) : (
                <span className="hidden md:block text-sm font-medium">
                  John Smith
                </span>
              )}
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
