import { useGame } from "@/contexts/GameContext";
import { Users, MessageCircle, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Friends = () => {
  const { friends, removeFriend, messages, addMessage } = useGame();
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const friendMessages = messages.filter(
    (m) => m.senderId === selectedFriend || m.senderId === "user-1"
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedFriend) {
      addMessage({
        senderId: "user-1",
        senderName: "You",
        content: messageText,
      });
      setMessageText("");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2">
          <Users size={32} className="text-primary" />
          <h1 className="text-4xl font-bold">Friends</h1>
        </div>
        <p className="text-muted-foreground">
          {friends.length} friend{friends.length !== 1 ? "s" : ""} online
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Friends List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-xl font-bold mb-4">Your Friends</h2>
          {friends.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <UserPlus size={32} className="mx-auto mb-2 opacity-50" />
              <p>No friends yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.map((friend, idx) => (
                <div
                  key={friend.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-300 animate-fade-in-up hover-lift ${
                    selectedFriend === friend.id
                      ? "bg-primary/30 border border-primary"
                      : "bg-card hover:bg-card/80"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  onClick={() => setSelectedFriend(friend.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{friend.avatar}</span>
                      <div>
                        <p className="font-semibold">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {friend.status === "online" && "🟢 Online"}
                          {friend.status === "offline" && "⚫ Offline"}
                          {friend.status === "playing" && `🎮 Playing ${friend.currentGame}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFriend(friend.id);
                      }}
                      className="p-1 hover:bg-destructive/20 rounded transition-colors"
                    >
                      <UserMinus size={16} className="text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedFriend ? (
            <div className="bg-card rounded-xl p-4 h-96 flex flex-col">
              <div className="border-b border-sidebar-border pb-3 mb-4">
                <h2 className="font-bold">
                  {friends.find((f) => f.id === selectedFriend)?.name}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {friendMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <MessageCircle size={32} className="opacity-50" />
                  </div>
                ) : (
                  friendMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === "user-1" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.senderId === "user-1"
                            ? "bg-primary text-primary-foreground"
                            : "bg-sidebar-accent/20"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 bg-sidebar-accent/10 border border-sidebar-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <Button size="sm" onClick={handleSendMessage} className="hover-scale">
                  <MessageCircle size={14} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl p-8 h-96 flex items-center justify-center text-center text-muted-foreground">
              <div>
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>Select a friend to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
