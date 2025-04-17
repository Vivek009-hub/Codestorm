
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/articles/ArticleCard';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getArticles, getAllCategories } from '@/services/articleService';

const HealthArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const categories = getAllCategories();

  useEffect(() => {
    const articles = getArticles({
      search: searchTerm,
      category: selectedCategory,
      trending: activeTab === 'trending'
    });
    
    setFilteredArticles(articles);
  }, [searchTerm, selectedCategory, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Health Articles & Resources
              </h1>
              <p className="text-xl text-gray-600">
                Evidence-based information on important health topics
              </p>
            </div>
            
            {/* Search and filters */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge 
                className={`cursor-pointer ${selectedCategory === '' ? 'bg-medical-blue' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setSelectedCategory('')}
              >
                All Categories
              </Badge>
              {categories.map(category => (
                <Badge 
                  key={category}
                  className={`cursor-pointer ${selectedCategory === category ? 'bg-medical-blue' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthArticles;
