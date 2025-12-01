import { useGame } from "@/contexts/GameContext";
import { Bell, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const { notifications, markNotificationAsRead, clearNotifications } = useGame();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 border-green-500/50";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/50";
      case "error":
        return "bg-red-500/20 border-red-500/50";
      default:
        return "bg-blue-500/20 border-blue-500/50";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell size={32} className="text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Notificações</h1>
            <p className="text-muted-foreground">
              {notifications.length} notificação{notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {notifications.length > 0 && (
          <Button
            variant="outline"
            onClick={clearNotifications}
            className="hover-scale"
          >
            <Trash2 size={16} className="mr-2" />
            Limpar Tudo
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bell size={64} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No notifications</h2>
          <p className="text-muted-foreground">
            You're all caught up! Check back later for updates
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, idx) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer hover-lift animate-fade-in-up ${getNotificationColor(
                notif.type
              )} ${notif.read ? "opacity-60" : ""}`}
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => markNotificationAsRead(notif.id)}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getNotificationIcon(notif.type)}</span>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{notif.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notif.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
