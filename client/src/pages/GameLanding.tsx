import { useState, useEffect } from "react";
import { ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameSidebar } from "@/components/GameSidebar";
import { GameHeader } from "@/components/GameHeader";
import { GameCard } from "@/components/GameCard";
import { FeaturedGame } from "@/components/FeaturedGame";
import { useGame } from "@/contexts/GameContext";

const GameLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { filteredGames, allGames, searchQuery } = useGame();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gamesToDisplay = searchQuery ? filteredGames : allGames.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <GameSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-24" : "ml-20"}`}>
          {/* Header */}
          <GameHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

          {/* Content Sections */}
          <div className="p-4 md:p-6 lg:p-8 space-y-8">
            {/* Featured Game Section - Hide when searching */}
            {!searchQuery && (
              <FeaturedGame
                title="Valorant"
                description="Valorant é um jogo competitivo onde precisão e trabalho em equipe são essenciais para a vitória. Domine suas habilidades e domine o campo de batalha."
                image="/hero-character.png"
                category="Popular"
                reviews="33"
                scrollY={scrollY}
              />
            )}

            {/* New Games / Search Results Section */}
            <section>
              <div className="flex items-center justify-between mb-6 animate-fade-in-up">
                <h3 className="text-2xl font-bold">
                  {searchQuery ? `Resultados de busca para "${searchQuery}"` : "Novos Jogos"}
                </h3>
                {!searchQuery && (
                  <a href="#" className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 hover-scale">
                    Ver Mais <ChevronRight size={16} />
                  </a>
                )}
              </div>

              {gamesToDisplay.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">Nenhum jogo encontrado na sua busca</p>
                  <p className="text-sm">Tente buscar por um jogo ou gênero diferente</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {gamesToDisplay.map((game, idx) => (
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
            </section>

            {/* Last Downloads Section - Hide when searching */}
            {!searchQuery && (
              <section>
                <div className="flex items-center justify-between mb-6 animate-fade-in-up">
                  <h3 className="text-2xl font-bold">Downloads Recentes</h3>
                  <a href="#" className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 hover-scale">
                    Ver Mais <ChevronRight size={16} />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Download Card 1 */}
                  <div className="flex gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer group hover-lift animate-fade-in-up">
                    <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Download size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">FIFA 23</h4>
                      <p className="text-xs text-muted-foreground mb-2">Simulação Esportiva</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">1 hora 29 min.</span>
                        <Button size="sm" variant="outline" className="hover-scale">
                          Retomar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Download Card 2 */}
                  <div className="flex gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer group hover-lift animate-fade-in-up stagger-1">
                    <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Download size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">Título do Jogo</h4>
                      <p className="text-xs text-muted-foreground mb-2">Ação Aventura</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs">2 horas 15 min.</span>
                        <Button size="sm" variant="outline" className="hover-scale">
                          Retomar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Statistics Section - Hide when searching */}
            {!searchQuery && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Hours Played */}
                <div className="p-6 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up">
                  <h4 className="text-sm text-muted-foreground mb-4">Suas Estatísticas</h4>
                  <div className="flex flex-col items-center justify-center py-8">
                    <div
                      className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center relative hover:border-primary/60 transition-colors"
                      style={{
                        boxShadow: "0 0 30px rgba(255, 100, 50, 0.2)",
                      }}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold animate-scale-pulse">12.340</div>
                        <div className="text-xs text-muted-foreground">horas jogadas</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Time */}
                <div className="p-6 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up stagger-1">
                  <h4 className="text-sm text-muted-foreground mb-4">Tempo de Jogo</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Valorant", hours: "2.340h" },
                      { label: "CS:GO", hours: "5.420h" },
                      { label: "Dota 2", hours: "4.580h" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded hover:bg-sidebar-accent/10 transition-colors animate-fade-in-up"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <span className="text-xs">{item.label}</span>
                        <span className="text-sm font-semibold text-primary">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="p-6 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up stagger-2">
                  <h4 className="text-sm text-muted-foreground mb-4">Conquistas</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-lg hover:scale-110 hover:bg-primary/40 transition-all cursor-pointer animate-fade-in-up"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        🏆
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Footer spacing */}
            <div className="h-8" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameLanding;
