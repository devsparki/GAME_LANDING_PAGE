import { useGame } from "@/contexts/GameContext";
import { User, Award, Clock, Zap } from "lucide-react";

const Profile = () => {
  const { userProfile } = useGame();

  const stats = [
    { label: "Nível", value: userProfile.level, icon: Award },
    { label: "Horas Totais", value: userProfile.totalHours.toLocaleString(), icon: Clock },
    { label: "Pontos", value: userProfile.points.toLocaleString(), icon: Zap },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary/80 to-primary/40 rounded-2xl p-8 animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground hover-scale">
            {userProfile.avatar}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{userProfile.name}</h1>
            <p className="text-primary-foreground/90 mb-4">
              Membro desde {userProfile.joinDate.toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {userProfile.badges.map((badge, idx) => (
                <span key={idx} className="text-3xl hover:scale-125 transition-transform cursor-pointer">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift animate-fade-in-up text-center"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <Icon size={32} className="mx-auto mb-3 text-primary" />
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Conquistas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {userProfile.badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-card hover:bg-card/80 transition-all duration-300 hover-lift text-center group cursor-pointer"
            >
              <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">
                {badge}
              </div>
              <p className="text-xs text-muted-foreground">Achievement {idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-card rounded-xl p-6 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-sidebar-border">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-semibold">{userProfile.id}</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-sidebar-border">
            <span className="text-muted-foreground">Account Level</span>
            <span className="font-semibold text-primary">Level {userProfile.level}</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-sidebar-border">
            <span className="text-muted-foreground">Member Since</span>
            <span className="font-semibold">{userProfile.joinDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Points</span>
            <span className="font-semibold text-primary">{userProfile.points.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
