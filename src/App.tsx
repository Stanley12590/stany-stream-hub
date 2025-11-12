import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import AdminAuth from "./pages/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import Channels from "./pages/admin/Channels";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Notifications from "./pages/admin/Notifications";
import Contact from "./pages/admin/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/movies" element={<Movies />} />
          <Route path="/admin/channels" element={<Channels />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
