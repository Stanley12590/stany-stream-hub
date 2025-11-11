import { Button } from "@/components/ui/button";
import { Play, Film, Tv } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_20%_/_0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_20%_/_0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-glow-pulse">
            <Film className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Unlimited Movies & TV Shows</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            STANY MIN TV
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stream unlimited movies, TV shows, and live channels in stunning quality. 
            Your cinema experience starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-gradient-primary hover:shadow-glow-primary transition-all">
                <Play className="w-6 h-6" />
                Get Started
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                <Tv className="w-6 h-6" />
                Browse Content
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Film,
              title: "Unlimited Movies",
              description: "Access thousands of movies across all genres in HD quality"
            },
            {
              icon: Tv,
              title: "Live TV Channels",
              description: "Watch live TV channels with high-quality streaming"
            },
            {
              icon: Play,
              title: "Watch Anywhere",
              description: "Stream on any device, anytime, anywhere you want"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
