import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Plus, Star, Calendar, Film as FilmIcon } from "lucide-react";

// Mock data - will be replaced with database
const mockMovieDetails = {
  1: {
    title: "Action Hero",
    description: "An adrenaline-fueled adventure featuring intense action sequences and breathtaking stunts. Follow our hero as they battle against impossible odds to save the world.",
    genre: "Action",
    year: 2024,
    rating: 8.5,
    duration: "2h 15min",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    trailer: "https://example.com/trailer",
  },
  2: {
    title: "Space Adventure",
    description: "Journey through the cosmos in this epic space adventure. Discover new worlds, encounter alien civilizations, and witness the beauty of the universe.",
    genre: "Sci-Fi",
    year: 2024,
    rating: 9.0,
    duration: "2h 30min",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
    trailer: "https://example.com/trailer",
  },
  3: {
    title: "Mystery Night",
    description: "A thrilling mystery that will keep you on the edge of your seat. Follow the clues, solve the puzzles, and uncover the truth behind the darkness.",
    genre: "Thriller",
    year: 2023,
    rating: 7.8,
    duration: "1h 55min",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
    trailer: "https://example.com/trailer",
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = mockMovieDetails[Number(id) as keyof typeof mockMovieDetails];

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <Button onClick={() => navigate("/browse")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Button
            variant="ghost"
            onClick={() => navigate("/browse")}
            className="absolute top-4 left-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2 text-accent">
                <Star className="w-5 h-5 fill-accent" />
                <span className="font-bold text-lg">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <FilmIcon className="w-4 h-4" />
                <span>{movie.genre}</span>
              </div>
              <span>{movie.duration}</span>
            </div>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-gradient-primary hover:shadow-glow-primary">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Trailer
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Plus className="w-5 h-5" />
                My List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
