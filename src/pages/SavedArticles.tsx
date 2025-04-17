
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/articles/ArticleCard';
import { Article } from '@/components/articles/ArticleCard';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load saved articles from localStorage
    const loadSavedArticles = () => {
      const saved = localStorage.getItem('savedArticles');
      if (saved) {
        try {
          setSavedArticles(JSON.parse(saved));
        } catch (error) {
          console.error('Error parsing saved articles', error);
          setSavedArticles([]);
        }
      }
    };

    loadSavedArticles();
  }, []);

  const handleRemoveArticle = (articleId: number) => {
    const updatedArticles = savedArticles.filter(article => article.id !== articleId);
    setSavedArticles(updatedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
    toast.success('Article removed from saved items');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Saved Articles
              </h1>
              <p className="text-xl text-gray-600">
                Access your bookmarked health information
              </p>
            </div>
            
            {savedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArticles.map(article => (
                  <div key={article.id} className="relative group">
                    <ArticleCard article={article} />
                    <button 
                      onClick={() => handleRemoveArticle(article.id)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-red-50 text-red-500 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-4">No saved articles yet</h3>
                <p className="text-muted-foreground mb-6">
                  Browse articles and save them to access later
                </p>
                <Button asChild>
                  <Link to="/health-articles">Browse Articles</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SavedArticles;
