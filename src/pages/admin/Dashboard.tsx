import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Tv, Users, Bell, LogOut, Layers, Phone } from "lucide-react";

const Dashboard = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    movies: 0,
    channels: 0,
    users: 0,
    categories: 0,
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin/auth");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    const [moviesRes, channelsRes, usersRes, categoriesRes] = await Promise.all([
      supabase.from("movies").select("*", { count: "exact", head: true }),
      supabase.from("live_channels").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      movies: moviesRes.count || 0,
      channels: channelsRes.count || 0,
      users: usersRes.count || 0,
      categories: categoriesRes.count || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/95 backdrop-blur border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{stats.movies}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-accent" />
                Live Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{stats.channels}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{stats.users}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-muted-foreground" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground">{stats.categories}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/movies")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-6 w-6 text-primary" />
                Manage Movies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add, edit, and delete movies</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/channels")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tv className="h-6 w-6 text-accent" />
                Manage Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add, edit, and delete live TV channels</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/users")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-secondary" />
                Manage Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View users and manage subscriptions</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/categories")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-6 w-6 text-muted-foreground" />
                Manage Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Organize content categories</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/notifications")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-primary" />
                Send Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Push notifications to users</p>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate("/admin/contact")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-accent" />
                Contact Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Update WhatsApp contact info</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
