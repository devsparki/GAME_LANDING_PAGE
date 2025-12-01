import { useGame } from "@/contexts/GameContext";
import { GameCard } from "@/components/GameCard";
import { TrendingUp } from "lucide-react";

const Trending = () => {
  const { allGames } = useGame();

  // Sort games by rating and reviews to simulate trending
  const trendingGames = [...allGames].sort((a, b) => {
    const scoreA = a.rating * a.reviews;
    const scoreB = b.rating * b.reviews;
    return scoreB - scoreA;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Em Tendência</h1>
        </div>
        <p className="text-muted-foreground">
          Jogos mais populares desta semana
        </p>
      </div>

      <div className="space-y-6">
        {trendingGames.map((game, idx) => (
          <div
            key={game.id}
            className="flex gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <div className="text-4xl">🎮</div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{game.title}</h3>
                  <p className="text-xs text-muted-foreground">{game.genre}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold">{game.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{game.reviews} avaliações</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {game.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {game.price > 0 ? `R$ ${(game.price * 5).toFixed(2)}` : "Grátis"}
                </span>
                <span className="text-xs text-primary font-semibold">#{idx + 1} Em Tendência</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
