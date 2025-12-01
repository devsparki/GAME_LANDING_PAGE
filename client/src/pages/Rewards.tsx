import { useGame } from "@/contexts/GameContext";
import { Gift, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const AVAILABLE_REWARDS: Reward[] = [
  {
    id: "1",
    title: "R$ 50 Crédito da Loja",
    description: "Use este crédito para comprar qualquer jogo",
    points: 1000,
    icon: "💳",
    rarity: "common",
  },
  {
    id: "2",
    title: "Avatar Exclusivo",
    description: "Desbloqueie um avatar especial para seu perfil",
    points: 500,
    icon: "👑",
    rarity: "rare",
  },
  {
    id: "3",
    title: "Game Pass 1 Mês",
    description: "Acesso à nossa biblioteca de jogos premium",
    points: 2000,
    icon: "🎮",
    rarity: "epic",
  },
  {
    id: "4",
    title: "Insígnia Lendária",
    description: "Mostre sua conquista com uma insígnia lendária",
    points: 5000,
    icon: "⭐",
    rarity: "legendary",
  },
  {
    id: "5",
    title: "Fim de Semana com Pontos Dobrados",
    description: "Ganhe 2x pontos por 48 horas",
    points: 1500,
    icon: "🚀",
    rarity: "epic",
  },
  {
    id: "6",
    title: "Bônus de Convite de Amigo",
    description: "Ganhe pontos bônus quando seu amigo se juntar",
    points: 750,
    icon: "👥",
    rarity: "rare",
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-500/20 border-gray-500/50";
    case "rare":
      return "bg-blue-500/20 border-blue-500/50";
    case "epic":
      return "bg-purple-500/20 border-purple-500/50";
    case "legendary":
      return "bg-yellow-500/20 border-yellow-500/50";
    default:
      return "bg-sidebar-accent/20 border-sidebar-accent/50";
  }
};

const Rewards = () => {
  const { userProfile, addPoints } = useGame();

  const handleRedeemReward = (reward: Reward) => {
    if (userProfile.points >= reward.points) {
      addPoints(-reward.points);
      alert(`Parabéns! Você resgatou: ${reward.title}`);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Points Header */}
      <div className="bg-gradient-to-r from-primary/80 to-primary/40 rounded-2xl p-8 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Zap size={48} className="text-primary-foreground" />
            <div>
              <p className="text-primary-foreground/80 text-sm">Seus Pontos</p>
              <p className="text-4xl font-bold text-primary-foreground">
                {userProfile.points.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/80 text-sm">Nível</p>
            <p className="text-4xl font-bold text-primary-foreground">
              {userProfile.level}
            </p>
          </div>
        </div>
      </div>

      {/* How to Earn */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Como Ganhar Pontos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "🎮", title: "Jogar Jogos", desc: "Ganhe pontos enquanto joga" },
            { icon: "🏆", title: "Conquistas", desc: "Complete desafios para ganhar pontos bônus" },
            { icon: "👥", title: "Convidar Amigos", desc: "Ganhe recompensas quando amigos se juntam" },
            { icon: "📅", title: "Login Diário", desc: "Pontos bônus por fazer login diariamente" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <p className="text-3xl mb-2">{item.icon}</p>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Recompensas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AVAILABLE_REWARDS.map((reward, idx) => (
            <div
              key={reward.id}
              className={`p-6 rounded-xl border transition-all duration-300 hover-lift animate-fade-in-up ${getRarityColor(
                reward.rarity
              )}`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-4xl">{reward.icon}</p>
                <span className="text-xs font-semibold px-2 py-1 bg-sidebar-accent/20 rounded-full capitalize">
                  {reward.rarity === "common" ? "Comum" : reward.rarity === "rare" ? "Raro" : reward.rarity === "epic" ? "Épico" : "Lendário"}
                </span>
              </div>
              <h3 className="font-bold mb-1">{reward.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Zap size={16} className="text-primary" />
                  <span className="font-semibold">{reward.points}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleRedeemReward(reward)}
                  disabled={userProfile.points < reward.points}
                  className="hover-scale"
                >
                  Resgatar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Melhores Jogadores</h2>
        <div className="space-y-2">
          {[
            { rank: 1, name: "ProGamer", points: 15000 },
            { rank: 2, name: "NinjaPlayer", points: 12500 },
            { rank: 3, name: "SkyWalker", points: 11200 },
            { rank: 4, name: "Você", points: userProfile.points, isYou: true },
          ].map((player, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover-lift animate-fade-in-up ${
                player.isYou ? "bg-primary/20 border border-primary" : "bg-card hover:bg-card/80"
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center font-bold">
                  {player.rank}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {player.points.toLocaleString()} pontos
                  </p>
                </div>
              </div>
              {player.rank <= 3 && (
                <span className="text-2xl">
                  {player.rank === 1 && "🥇"}
                  {player.rank === 2 && "🥈"}
                  {player.rank === 3 && "🥉"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
