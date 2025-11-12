import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Movie = Tables<"movies">;
type Category = Tables<"categories">;

const Movies = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    release_year: "",
    imdb_rating: "",
    poster_url: "",
    trailer_url: "",
    video_url: "",
    category_id: "",
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/admin/auth");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchMovies();
      fetchCategories();
    }
  }, [isAdmin]);

  const fetchMovies = async () => {
    const { data } = await supabase.from("movies").select("*").order("created_at", { ascending: false });
    if (data) setMovies(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const movieData = {
      title: formData.title,
      description: formData.description || null,
      genre: formData.genre || null,
      release_year: formData.release_year ? parseInt(formData.release_year) : null,
      imdb_rating: formData.imdb_rating ? parseFloat(formData.imdb_rating) : null,
      poster_url: formData.poster_url || null,
      trailer_url: formData.trailer_url || null,
      video_url: formData.video_url || null,
      category_id: formData.category_id || null,
    };

    if (editingMovie) {
      const { error } = await supabase.from("movies").update(movieData).eq("id", editingMovie.id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Movie updated successfully" });
      }
    } else {
      const { error } = await supabase.from("movies").insert(movieData);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Movie added successfully" });
      }
    }

    setIsDialogOpen(false);
    resetForm();
    fetchMovies();
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description || "",
      genre: movie.genre || "",
      release_year: movie.release_year?.toString() || "",
      imdb_rating: movie.imdb_rating?.toString() || "",
      poster_url: movie.poster_url || "",
      trailer_url: movie.trailer_url || "",
      video_url: movie.video_url || "",
      category_id: movie.category_id || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this movie?")) {
      const { error } = await supabase.from("movies").delete().eq("id", id);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Movie deleted successfully" });
        fetchMovies();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      genre: "",
      release_year: "",
      imdb_rating: "",
      poster_url: "",
      trailer_url: "",
      video_url: "",
      category_id: "",
    });
    setEditingMovie(null);
  };

  if (loading) return null;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Manage Movies</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingMovie ? "Edit Movie" : "Add New Movie"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="release_year">Release Year</Label>
                    <Input id="release_year" type="number" value={formData.release_year} onChange={(e) => setFormData({ ...formData, release_year: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="imdb_rating">IMDB Rating</Label>
                    <Input id="imdb_rating" type="number" step="0.1" max="10" value={formData.imdb_rating} onChange={(e) => setFormData({ ...formData, imdb_rating: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="poster_url">Poster URL</Label>
                  <Input id="poster_url" value={formData.poster_url} onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="trailer_url">Trailer URL</Label>
                  <Input id="trailer_url" value={formData.trailer_url} onChange={(e) => setFormData({ ...formData, trailer_url: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input id="video_url" value={formData.video_url} onChange={(e) => setFormData({ ...formData, video_url: e.target.value })} />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button type="submit" className="bg-gradient-primary">{editingMovie ? "Update" : "Add"} Movie</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-card/95 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle>All Movies ({movies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell className="font-medium">{movie.title}</TableCell>
                    <TableCell>{movie.genre || "-"}</TableCell>
                    <TableCell>{movie.release_year || "-"}</TableCell>
                    <TableCell>{movie.imdb_rating || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(movie)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(movie.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Movies;
