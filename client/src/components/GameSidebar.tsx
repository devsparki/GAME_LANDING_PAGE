import { useState } from "react";
import { useLocation } from "wouter";

interface SidebarItem {
  icon: string;
  label: string;
  path: string;
}

interface GameSidebarProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: "🎮", label: "Games", path: "/" },
  { icon: "❤️", label: "Favorites", path: "/favorites" },
  { icon: "🏆", label: "Trending", path: "/trending" },
  { icon: "📥", label: "Downloads", path: "/downloads" },
  { icon: "⚙️", label: "Settings", path: "/settings" },
  { icon: "👥", label: "Friends", path: "/friends" },
  { icon: "💬", label: "Messages", path: "/messages" },
  { icon: "🎁", label: "Rewards", path: "/rewards" },
];

export const GameSidebar = ({ isOpen, onToggle }: GameSidebarProps) => {
  const [location, setLocation] = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const activeIndex = SIDEBAR_ITEMS.findIndex((item) => item.path === location);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isOpen ? "w-24" : "w-20"
      } flex flex-col items-center py-6 space-y-8 z-50`}
    >
      {/* Logo */}
      <div
        onClick={() => setLocation("/")}
        className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl hover:scale-110 transition-transform hover-glow cursor-pointer animate-fade-in-down"
      >
        N
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-6 flex-1">
        {SIDEBAR_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg cursor-pointer transition-all hover:scale-110 group relative animate-fade-in-up ${
              activeIndex === idx
                ? "bg-primary/30 text-primary"
                : "bg-sidebar-accent/10 hover:bg-sidebar-accent/20"
            }`}
            style={{ animationDelay: `${idx * 50}ms` }}
            onClick={() => setLocation(item.path)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <span className={`transition-transform ${hoveredIndex === idx ? "scale-125" : ""}`}>
              {item.icon}
            </span>

            {/* Tooltip */}
            {isOpen && (
              <div
                className={`absolute left-16 bg-sidebar-accent text-sidebar-accent-foreground px-2 py-1 rounded text-xs whitespace-nowrap transition-all duration-200 ${
                  hoveredIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                {item.label}
              </div>
            )}

            {/* Active indicator */}
            {activeIndex === idx && (
              <div className="absolute right-0 w-1 h-8 bg-primary rounded-l animate-pulse-glow" />
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div
        onClick={() => setLocation("/profile")}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold cursor-pointer hover:scale-110 transition-transform hover-glow animate-fade-in-up"
      >
        U
      </div>
    </aside>
  );
};
