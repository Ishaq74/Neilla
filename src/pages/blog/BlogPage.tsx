import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, getBlogCategories } from "@/lib/apiBlog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  published_at: string | null;
  views_count: number;
  author_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const fetchPosts = React.useCallback(async () => {
    setIsLoading(true);
    try {
      let posts = await getBlogPosts();
      if (selectedCategory) {
        posts = posts.filter((p: BlogPost) => p.category === selectedCategory);
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        posts = posts.filter((p: BlogPost) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q))
        );
      }
      setPosts(posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setIsLoading(false);
  }, [selectedCategory, searchQuery]);

  const fetchCategories = React.useCallback(async () => {
    try {
      const categories = await getBlogCategories();
      setCategories(categories || []);
    } catch (error) {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  // ...existing code...

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main-content" className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="font-elegant text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notre Blog
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez nos conseils beauté, tendances maquillage et actualités de l'univers Artisan Beauty
          </p>
        </section>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-gradient-luxury text-primary-foreground" : ""}
            >
              Tous
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={selectedCategory === cat.slug ? "bg-gradient-luxury text-primary-foreground" : ""}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Aucun article trouvé
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden border-border hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-luxury opacity-20" />
                  )}
                  {post.category && (
                    <Badge 
                      className="absolute top-3 left-3"
                      style={{ 
                        backgroundColor: categories.find(c => c.slug === post.category)?.color || '#C4963C'
                      }}
                    >
                      {categories.find(c => c.slug === post.category)?.name || post.category}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <h3 className="font-elegant text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(post.published_at), "d MMM yyyy", { locale: fr })}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt || "Découvrez cet article..."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    Lire l'article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
