import { useState } from "react";
import { Play, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";

interface GameCardProps {
  title: string;
  image: string;
  category: string;
  price?: string;
  delay?: number;
  gameId?: string;
}

export const GameCard = ({ title, image, category, price, delay = 0, gameId }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite, addToCart } = useGame();
  const favorited = gameId ? isFavorite(gameId) : false;

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameId) {
      toggleFavorite(gameId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameId) {
      const game = {
        id: gameId,
        title,
        image,
        category,
        price: price ? parseFloat(price.replace("$", "")) : 0,
        rating: 4.5,
        reviews: 100,
        description: "",
        genre: category,
        releaseDate: new Date().toISOString(),
        developer: "Unknown",
      };
      addToCart(game);
    }
  };

  return (
    <div
      className="group rounded-xl overflow-hidden bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/20 animate-fade-in-up hover-lift"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
        <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🎮</div>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 flex items-end p-4 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 hover-scale"
            onClick={handleAddToCart}
          >
            <Play size={14} className="mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-xs text-muted-foreground mb-3">{category}</p>
        <div className="flex items-center justify-between">
          {price && <span className="text-xs font-semibold">{price}</span>}
          <div className="flex gap-2">
            <button
              onClick={handleFavorite}
              className={`p-1 hover:bg-sidebar-accent/10 rounded transition-all hover-scale ${
                favorited ? "text-primary" : ""
              }`}
              title={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart size={14} fill={favorited ? "currentColor" : "none"} />
            </button>
            <button className="p-1 hover:bg-sidebar-accent/10 rounded transition-colors hover-scale" title="Compartilhar">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
