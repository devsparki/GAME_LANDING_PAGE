import { useState } from "react";
import { useLocation } from "wouter";
import { Menu, Search, ShoppingCart, Bell, User } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

interface GameHeaderProps {
  onMenuToggle: () => void;
}

export const GameHeader = ({ onMenuToggle }: GameHeaderProps) => {
  const [, setLocation] = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const { searchQuery, setSearchQuery, unreadCount, cart } = useGame();

  return (
    <header className="sticky top-0 z-40 bg-sidebar/80 backdrop-blur-md border-b border-sidebar-border animate-fade-in-down">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-sidebar-accent/10 rounded-lg transition-colors hover-scale"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm text-muted-foreground animate-fade-in-up">Boa noite, NIKITIN</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs md:max-w-md mx-0 md:mx-4 hidden sm:block">
          <div
            className={`relative transition-all duration-300 ${
              searchFocused ? "scale-105" : ""
            }`}
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sidebar-accent/10 border border-sidebar-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:bg-sidebar-accent/20 transition-all duration-300"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLocation("/cart")}
            className="p-1.5 md:p-2 hover:bg-sidebar-accent/10 rounded-lg transition-colors hover-scale relative group"
            title="Carrinho"
          >
            <ShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setLocation("/notifications")}
            className="p-1.5 md:p-2 hover:bg-sidebar-accent/10 rounded-lg transition-colors hover-scale relative group"
            title="Notificações"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center animate-pulse-glow font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setLocation("/profile")}
            className="p-1.5 md:p-2 hover:bg-sidebar-accent/10 rounded-lg transition-colors hover-scale"
            title="Perfil"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
