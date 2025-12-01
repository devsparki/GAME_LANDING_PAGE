import { useGame } from "@/contexts/GameContext";
import { GameCard } from "@/components/GameCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { allGames, favorites, isFavorite } = useGame();

  const favoriteGames = allGames.filter((game) => isFavorite(game.id));

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Heart size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Meus Favoritos</h1>
        </div>
        <p className="text-muted-foreground">
          {favoriteGames.length} jogo{favoriteGames.length !== 1 ? "s" : ""} na sua coleção
        </p>
      </div>

      {favoriteGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart size={64} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhum favorito ainda</h2>
          <p className="text-muted-foreground">
            Começe a adicionar jogos aos seus favoritos para vê-los aqui
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {favoriteGames.map((game, idx) => (
            <GameCard
              key={game.id}
              gameId={game.id}
              title={game.title}
              image={game.image}
              category={game.category}
              price={game.price > 0 ? `R$ ${(game.price * 5).toFixed(2)}` : "Grátis"}
              delay={idx * 50}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
