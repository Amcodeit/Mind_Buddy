import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/layout/Layout";
import ChatWidget from "@/components/chat/ChatWidget";
import Index from "./pages/Index";
import Login from "./pages/Login";
import InstitutionSelection from "./pages/InstitutionSelection";
import Resources from "./pages/Resources";
import Forum from "./pages/Forum";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SystemHealth from "./pages/SystemHealth";
import UserManagement from "./pages/UserManagement";
import ContentModeration from "./pages/ContentModeration";
import Sessions from "./pages/Sessions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/select-institution" element={<InstitutionSelection />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="resources" element={<Resources />} />
              <Route path="forum" element={<Forum />} />
              <Route path="booking" element={<Booking />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="sessions" element={<Sessions />} />
              <Route path="system" element={<SystemHealth />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="moderation" element={<ContentModeration />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ChatWidget />
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
