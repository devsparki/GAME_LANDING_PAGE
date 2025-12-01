import { createContext, useState, useCallback, useEffect } from "react";

export interface Game {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  genre: string;
  releaseDate: string;
  developer: string;
}

export interface CartItem extends Game {
  quantity: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "playing";
  currentGame?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalHours: number;
  points: number;
  badges: string[];
  joinDate: Date;
}

interface GameContextType {
  // Games
  allGames: Game[];
  filteredGames: Game[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // Favorites
  favorites: string[];
  toggleFavorite: (gameId: string) => void;
  isFavorite: (gameId: string) => boolean;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addPoints: (points: number) => void;

  // Friends
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;

  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "timestamp" | "read">) => void;
  markMessageAsRead: (messageId: string) => void;

  // Downloads
  downloads: { gameId: string; progress: number; status: "downloading" | "paused" | "completed" }[];
  startDownload: (gameId: string) => void;
  pauseDownload: (gameId: string) => void;
  resumeDownload: (gameId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Mock data
const MOCK_GAMES: Game[] = [
  {
    id: "1",
    title: "Valorant",
    image: "/hero-character.png",
    category: "Popular",
    price: 0,
    rating: 4.8,
    reviews: 33,
    description: "Valorant is a competitive game where precision and teamwork are key to victory.",
    genre: "FPS",
    releaseDate: "2020-06-02",
    developer: "Riot Games",
  },
  {
    id: "2",
    title: "Uncharted 4",
    image: "/game-thumbnail-1.png",
    category: "Standard Edition",
    price: 29.99,
    rating: 4.7,
    reviews: 1250,
    description: "An epic adventure with stunning graphics and engaging story.",
    genre: "Action-Adventure",
    releaseDate: "2016-05-10",
    developer: "Naughty Dog",
  },
  {
    id: "3",
    title: "Dishonored",
    image: "/featured-game-banner.png",
    category: "Standard Edition",
    price: 19.99,
    rating: 4.6,
    reviews: 890,
    description: "Immersive stealth gameplay with multiple approaches to missions.",
    genre: "Action",
    releaseDate: "2012-10-09",
    developer: "Arkane Studios",
  },
  {
    id: "4",
    title: "FIFA 23",
    image: "/hero-character.png",
    category: "Sports",
    price: 59.99,
    rating: 4.3,
    reviews: 5420,
    description: "The ultimate football simulation experience.",
    genre: "Sports",
    releaseDate: "2022-09-27",
    developer: "EA Sports",
  },
  {
    id: "5",
    title: "Subway Surf",
    image: "/featured-game-banner.png",
    category: "Free",
    price: 0,
    rating: 4.5,
    reviews: 8900,
    description: "Endless runner game with exciting challenges.",
    genre: "Casual",
    releaseDate: "2012-11-30",
    developer: "Kiloo",
  },
  {
    id: "6",
    title: "Red Dead Redemption 3",
    image: "/game-thumbnail-1.png",
    category: "Premium Pack",
    price: 79.99,
    rating: 4.9,
    reviews: 12340,
    description: "Epic western adventure in a vast open world.",
    genre: "Action-Adventure",
    releaseDate: "2024-01-15",
    developer: "Rockstar Games",
  },
];

// Helper functions for localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to save to localStorage: ${key}`);
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allGames] = useState<Game[]>(MOCK_GAMES);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>(() => getFromLocalStorage("game_cart", []));
  const [favorites, setFavorites] = useState<string[]>(() => getFromLocalStorage("game_favorites", []));
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Alex", avatar: "👨‍🎮", status: "online", currentGame: "Valorant" },
    { id: "2", name: "Jordan", avatar: "👩‍🎮", status: "playing", currentGame: "FIFA 23" },
    { id: "3", name: "Casey", avatar: "👨‍🎮", status: "offline" },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [downloads, setDownloads] = useState<
    { gameId: string; progress: number; status: "downloading" | "paused" | "completed" }[]
  >([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: "user-1",
    name: "NIKITIN",
    avatar: "U",
    level: 42,
    totalHours: 12340,
    points: 5280,
    badges: ["🏆", "⭐", "🎮", "🔥", "💎"],
    joinDate: new Date("2020-01-15"),
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("game_cart", cart);
  }, [cart]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    saveToLocalStorage("game_favorites", favorites);
  }, [favorites]);

  const filteredGames = searchQuery
    ? allGames.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allGames;

  const addToCart = useCallback((game: Game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === game.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== gameId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleFavorite = useCallback((gameId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(gameId)
        ? prevFavorites.filter((id) => id !== gameId)
        : [...prevFavorites, gameId]
    );
  }, []);

  const isFavorite = useCallback((gameId: string) => favorites.includes(gameId), [favorites]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const updateUserProfile = useCallback((profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  }, []);

  const addPoints = useCallback((points: number) => {
    setUserProfile((prev) => ({ ...prev, points: prev.points + points }));
  }, []);

  const addFriend = useCallback((friend: Friend) => {
    setFriends((prev) => [...prev, friend]);
  }, []);

  const removeFriend = useCallback((friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
  }, []);

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp" | "read">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
  }, []);

  const markMessageAsRead = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    );
  }, []);

  const startDownload = useCallback((gameId: string) => {
    setDownloads((prev) => [
      ...prev,
      { gameId, progress: 0, status: "downloading" },
    ]);
  }, []);

  const pauseDownload = useCallback((gameId: string) => {
    setDownloads((prev) =>
      prev.map((d) => (d.gameId === gameId ? { ...d, status: "paused" } : d))
    );
  }, []);

  const resumeDownload = useCallback((gameId: string) => {
    setDownloads((prev) =>
      prev.map((d) => (d.gameId === gameId ? { ...d, status: "downloading" } : d))
    );
  }, []);

  const value: GameContextType = {
    allGames,
    filteredGames,
    searchQuery,
    setSearchQuery,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    favorites,
    toggleFavorite,
    isFavorite,
    notifications,
    unreadCount,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    userProfile,
    updateUserProfile,
    addPoints,
    friends,
    addFriend,
    removeFriend,
    messages,
    addMessage,
    markMessageAsRead,
    downloads,
    startDownload,
    pauseDownload,
    resumeDownload,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

import { useContext } from "react";
