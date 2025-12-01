import { useGame } from "@/contexts/GameContext";
import { Download, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Downloads = () => {
  const { allGames, downloads, pauseDownload, resumeDownload, startDownload } = useGame();
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const updated = { ...prev };
        downloads.forEach((d) => {
          if (d.status === "downloading" && (updated[d.gameId] || 0) < 100) {
            updated[d.gameId] = Math.min((updated[d.gameId] || 0) + Math.random() * 5, 100);
          }
        });
        return updated;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [downloads]);

  const downloadingGames = downloads.map((d) => ({
    ...allGames.find((g) => g.id === d.gameId)!,
    ...d,
    progress: Math.round(downloadProgress[d.gameId] || 0),
  }));

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Download size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Downloads</h1>
        </div>
        <p className="text-muted-foreground">
          {downloadingGames.length} download{downloadingGames.length !== 1 ? "s" : ""} em progresso
        </p>
      </div>

      {downloadingGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Download size={64} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhum download ativo</h2>
          <p className="text-muted-foreground">
            Comece a baixar jogos para vê-los aqui
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {downloadingGames.map((game, idx) => (
            <div
              key={game.id}
              className="p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex gap-4 mb-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{game.title}</h3>
                  <p className="text-xs text-muted-foreground">{game.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {game.status === "downloading" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => pauseDownload(game.id)}
                      className="hover-scale"
                    >
                      <Pause size={14} />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resumeDownload(game.id)}
                      className="hover-scale"
                    >
                      <Play size={14} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {game.status === "downloading" ? "Downloading" : "Paused"}
                  </span>
                  <span className="font-semibold">{game.progress}%</span>
                </div>
                <div className="w-full bg-sidebar-accent/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-300"
                    style={{ width: `${game.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-8 border-t border-sidebar-border">
        <h2 className="text-2xl font-bold mb-4">Available Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allGames.map((game) => (
            <div
              key={game.id}
              className="p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 text-center hover-lift"
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold mb-2">{game.title}</h3>
              <Button
                size="sm"
                className="w-full hover-scale"
                onClick={() => startDownload(game.id)}
              >
                <Download size={14} className="mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
