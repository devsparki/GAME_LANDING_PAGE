import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider } from "./contexts/GameContext";
import GameLanding from "./pages/GameLanding";
import Favorites from "./pages/Favorites";
import Trending from "./pages/Trending";
import Downloads from "./pages/Downloads";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Cart from "./pages/Cart";
import Rewards from "./pages/Rewards";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={GameLanding} />
      <Route path={"/favorites"} component={Favorites} />
      <Route path={"/trending"} component={Trending} />
      <Route path={"/downloads"} component={Downloads} />
      <Route path={"/friends"} component={Friends} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/notifications"} component={Notifications} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/rewards"} component={Rewards} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <GameProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
