import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Search, LogOut, Film, Star } from "lucide-react";
import { User } from "@supabase/supabase-js";

// Mock movie data for now - will be replaced with database
const mockMovies = [
  {
    id: 1,
    title: "Action Hero",
    genre: "Action",
    year: 2024,
    rating: 8.5,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
  },
  {
    id: 2,
    title: "Space Adventure",
    genre: "Sci-Fi",
    year: 2024,
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
  },
  {
    id: 3,
    title: "Mystery Night",
    genre: "Thriller",
    year: 2023,
    rating: 7.8,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400",
  },
  {
    id: 4,
    title: "Comedy Gold",
    genre: "Comedy",
    year: 2024,
    rating: 8.2,
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400",
  },
  {
    id: 5,
    title: "Love Story",
    genre: "Romance",
    year: 2023,
    rating: 7.5,
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400",
  },
  {
    id: 6,
    title: "Epic Drama",
    genre: "Drama",
    year: 2024,
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
  },
];

const Browse = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Film className="w-8 h-8" />
              STANY MIN TV
            </h1>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Movies</Button>
              <Button variant="ghost">TV Shows</Button>
              <Button variant="ghost">Live TV</Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Mobile Search */}
        <div className="sm:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-bold mb-6">Featured Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="group cursor-pointer animate-fade-in"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 border border-border hover:border-primary/50 transition-all">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 p-4">
                      <div className="flex items-center gap-2 text-accent">
                        <Star className="w-4 h-4 fill-accent" />
                        <span className="font-bold">{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {movie.genre} • {movie.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
