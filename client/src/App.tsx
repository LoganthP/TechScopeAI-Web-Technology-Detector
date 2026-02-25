import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DetectorPage from './pages/DetectorPage';
import HistoryPage from './pages/HistoryPage';
import ComparePage from './pages/ComparePage';
import { Shield, Search, Activity, History } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from './lib/utils';

function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-primary/20 bg-background/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-primary transition-all rounded-full" />
          <span className="font-bold text-xl tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase">TechScope AI</span>
        </Link>
        <div className="flex gap-8 items-center text-sm font-medium">
          <Link to="/detector" className={cn("flex items-center gap-2 transition-colors hover:text-primary", isActive('/detector') ? "text-primary glow-text" : "text-muted-foreground")}>
            <Search className="w-4 h-4" /> Scanner Dashboard
          </Link>
          <Link to="/compare" className={cn("flex items-center gap-2 transition-colors hover:text-primary", isActive('/compare') ? "text-primary glow-text" : "text-muted-foreground")}>
            <Activity className="w-4 h-4" /> Compare Intelligence
          </Link>
          <Link to="/history" className={cn("flex items-center gap-2 transition-colors hover:text-primary", isActive('/history') ? "text-primary glow-text" : "text-muted-foreground")}>
            <History className="w-4 h-4" /> Scan Logs
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative text-white">
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        <Navigation />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/detector" element={<DetectorPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </BrowserRouter>
  );
}

export default App;
