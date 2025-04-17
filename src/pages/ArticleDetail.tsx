
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarClock, 
  User, 
  ArrowLeft, 
  BookOpen, 
  Share2, 
  Bookmark,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { articlesData } from '@/services/articleService';
import { Article } from '@/components/articles/ArticleCard';
import { toast } from "sonner";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const articleId = parseInt(id);
      const foundArticle = articlesData.find(a => a.id === articleId);
      
      if (foundArticle) {
        setArticle(foundArticle);
        
        // Get related articles from same category
        const related = articlesData
          .filter(a => a.category === foundArticle.category && a.id !== articleId)
          .slice(0, 3);
        setRelatedArticles(related);
        
        // Check if the article is already bookmarked
        const savedArticles = getSavedArticles();
        const isSaved = savedArticles.some(a => a.id === articleId);
        setIsBookmarked(isSaved);
      }
    }
  }, [id]);

  const getSavedArticles = (): Article[] => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved articles', error);
        return [];
      }
    }
    return [];
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleBookmark = () => {
    if (!article) return;
    
    const savedArticles = getSavedArticles();
    
    if (isBookmarked) {
      // Remove from saved
      const updatedArticles = savedArticles.filter(a => a.id !== article.id);
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
      toast.success("Article removed from bookmarks");
    } else {
      // Add to saved
      savedArticles.push(article);
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      toast.success("Article saved to bookmarks");
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Like removed" : "Article liked!");
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Article not found</h2>
            <Button asChild>
              <Link to="/health-articles">Back to Articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section with article header */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-14">
          <div className="container-custom">
            <div className="mb-10">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/health-articles" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>
              
              <Badge className="mb-6">{article.category}</Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{article.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4" />
                  <span className="text-sm">{article.publishDate} • {article.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="container-custom py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Main content */}
            <div className="col-span-1 md:col-span-8">
              <Card className="overflow-hidden border-0 shadow-lg rounded-xl mb-10">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <p className="text-xl leading-relaxed mb-8">{article.excerpt}</p>
                    
                    <Separator className="my-8" />
                    
                    <h2 className="text-2xl font-bold mb-6">Introduction</h2>
                    <p className="text-base leading-relaxed mb-6">
                      Healthcare is constantly evolving, with new research and treatments emerging regularly.
                      This article explores the latest developments in {article.category.toLowerCase()} and 
                      provides evidence-based recommendations for maintaining optimal health.
                    </p>
                    
                    <h2 className="text-2xl font-bold mb-6 mt-10">Key Findings</h2>
                    <p className="text-base leading-relaxed mb-6">
                      Recent studies have demonstrated significant progress in understanding {article.category.toLowerCase()}. 
                      Researchers have identified several important factors that contribute to better outcomes and 
                      improved quality of life for patients.
                    </p>
                    
                    <Card className="bg-blue-50 p-6 my-8 rounded-xl">
                      <h3 className="text-xl font-semibold mb-4">Research Methodology</h3>
                      <p className="text-base leading-relaxed">
                        This comprehensive review analyzed data from multiple clinical trials conducted between 
                        2018 and 2024. The studies included diverse populations across different age groups and 
                        demographic backgrounds to ensure broad applicability of the findings.
                      </p>
                    </Card>
                    
                    <h2 className="text-2xl font-bold mb-6 mt-10">Practical Implications</h2>
                    <p className="text-base leading-relaxed mb-6">
                      Based on the latest evidence, here are some practical recommendations for managing 
                      {' '}{article.category.toLowerCase()} conditions:
                    </p>
                    
                    <ul className="list-disc pl-6 space-y-3 mb-8">
                      <li className="text-base">Maintain regular consultations with healthcare providers</li>
                      <li className="text-base">Follow personalized treatment plans</li>
                      <li className="text-base">Adopt lifestyle modifications appropriate for your condition</li>
                      <li className="text-base">Stay informed about new developments in treatment options</li>
                      <li className="text-base">Participate in support groups and educational programs</li>
                    </ul>
                    
                    <Card className="bg-gray-50 p-6 my-8 rounded-xl border-l-4 border-medical-blue">
                      <h2 className="text-2xl font-bold mb-4">Future Directions</h2>
                      <p className="text-base leading-relaxed">
                        Ongoing research continues to explore innovative approaches to {article.category.toLowerCase()}. 
                        Promising areas include personalized medicine, digital health technologies, and 
                        integrative care models that address both physical and psychological aspects of health.
                      </p>
                    </Card>
                    
                    <h2 className="text-2xl font-bold mb-6 mt-10">Conclusion</h2>
                    <p className="text-base leading-relaxed">
                      The field of {article.category.toLowerCase()} has seen remarkable progress in recent years. 
                      By staying informed and working closely with healthcare providers, patients can benefit 
                      from these advances and achieve better health outcomes.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Article actions */}
              <Card className="p-6 mb-10 rounded-xl bg-white shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLike}
                      className={`flex items-center gap-2 rounded-full px-5 ${isLiked ? "text-red-500 border-red-200" : ""}`}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`} />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleBookmark}
                      className={`flex items-center gap-2 rounded-full px-5 ${isBookmarked ? "text-blue-500 border-blue-200" : ""}`}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-blue-500" : ""}`} />
                      <span>{isBookmarked ? "Saved" : "Save"}</span>
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2 rounded-full px-5">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </Button>
                </div>
              </Card>
              
              {/* Author info */}
              <Card className="mb-10 overflow-hidden rounded-xl border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-medical-blue">
                      <User className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{article.author}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Medical Specialist in {article.category}
                      </p>
                      <p className="text-base leading-relaxed">
                        {article.author.split(' ')[0]} {article.author.split(' ')[1]} is a renowned expert in {article.category.toLowerCase()} 
                        with over 15 years of clinical experience and research. Their work has been published 
                        in several prestigious medical journals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="col-span-1 md:col-span-4">
              {/* Related articles */}
              <Card className="p-6 mb-8 border-0 shadow-md rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedArticles.map(relatedArticle => (
                    <Card key={relatedArticle.id} className="overflow-hidden card-hover border border-gray-100">
                      <Link to={`/health-articles/${relatedArticle.id}`} className="flex gap-4">
                        <div className="w-24 h-24 overflow-hidden">
                          <img 
                            src={relatedArticle.imageUrl} 
                            alt={relatedArticle.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-3">
                          <h4 className="font-medium text-base line-clamp-2 mb-2">
                            {relatedArticle.title}
                          </h4>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CalendarClock className="h-3 w-3" />
                            {relatedArticle.readTime} min read
                          </span>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/health-articles">View All Articles</Link>
                </Button>
              </Card>
              
              {/* Categories */}
              <Card className="p-6 mb-8 border-0 shadow-md rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(articlesData.map(a => a.category))).map(category => (
                    <Link key={category} to={`/health-articles?category=${category}`}>
                      <Badge variant={category === article.category ? "default" : "outline"} className="cursor-pointer px-3 py-1 text-sm">
                        {category}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </Card>
              
              {/* Reading resources */}
              <Card className="p-6 mb-8 border-0 shadow-md rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <h3 className="text-xl font-semibold mb-4">Resources</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm transition-transform hover:translate-y-[-2px]">
                    <BookOpen className="h-5 w-5 text-medical-blue" />
                    <span className="text-base">National Health Guidelines</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm transition-transform hover:translate-y-[-2px]">
                    <BookOpen className="h-5 w-5 text-medical-blue" />
                    <span className="text-base">Medical Research Database</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm transition-transform hover:translate-y-[-2px]">
                    <BookOpen className="h-5 w-5 text-medical-blue" />
                    <span className="text-base">Patient Support Resources</span>
                  </div>
                </div>
              </Card>

              {/* Newsletter signup */}
              <Card className="p-6 border-0 shadow-md rounded-xl bg-gradient-to-br from-medical-blue to-blue-600 text-white">
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="mb-4 text-sm">
                  Subscribe to our newsletter for the latest articles and health information.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 rounded-l-md px-4 py-2 text-gray-800 text-sm focus:outline-none"
                  />
                  <Button className="rounded-l-none bg-medical-green hover:bg-green-600">
                    Subscribe
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
