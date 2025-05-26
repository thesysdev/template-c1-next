import React from "react";
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  LineChart,
  PieChart,
  Users,
  Settings,
  FileText,
  Clock,
  HelpCircle,
} from "lucide-react";
import { SkeletonPill } from "./LowFidelityComponents";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  lowFidelity?: boolean;
};

const primaryNavItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", isActive: true },
  { icon: <BarChart3 size={20} />, label: "Campaigns" },
  { icon: <Users size={20} />, label: "Audience" },
  { icon: <PieChart size={20} />, label: "Traffic Sources" },
  { icon: <LineChart size={20} />, label: "Conversions" },
  { icon: <Calendar size={20} />, label: "Schedule" },
];

const secondaryNavItems: NavItem[] = [
  { icon: <FileText size={20} />, label: "Reports" },
  { icon: <Clock size={20} />, label: "History" },
  { icon: <Settings size={20} />, label: "Settings" },
  { icon: <HelpCircle size={20} />, label: "Help & Support" },
];

const NavItem: React.FC<NavItem> = ({ icon, label, isActive, lowFidelity }) => {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        } ${
          lowFidelity
            ? isActive
              ? "bg-blue-100 h-7 hover:bg-blue-200"
              : "bg-gray-100 h-7 hover:bg-gray-200"
            : ""
        }`}
      >
        {!lowFidelity || isActive && (
          <>
            <span className={isActive ? "text-blue-600" : "text-gray-500"}>
              {icon}
            </span>
            <span className="text-sm font-medium">{label}</span>
          </>
        )}
      </a>
    </li>
  );
};

interface SidebarProps {
  lowFidelity: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ lowFidelity }) => {
  return (
    <aside className="w-64 overflow-y-auto bg-white border-r border-gray-200 pt-2 hidden lg:block">
      <div className="p-4">
        <nav className="space-y-1">
          <div className="mb-8">
            {lowFidelity ? (
              <SkeletonPill className="max-h-4 mb-2 max-w-1/3" />
            ) : (
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Analytics
              </p>
            )}
            <ul className="space-y-2">
              {primaryNavItems.map((item) => (
                <NavItem key={item.label} {...item} lowFidelity={lowFidelity} />
              ))}
            </ul>
          </div>

          <div>
            {lowFidelity ? (
              <SkeletonPill className="max-h-4 mb-2 max-w-1/3" />
            ) : (
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Support
              </p>
            )}
            <ul className="space-y-2">
              {secondaryNavItems.map((item) => (
                <NavItem key={item.label} {...item} lowFidelity={lowFidelity} />
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
