
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ArticleCard from '../articles/ArticleCard';
import { getArticles } from '@/services/articleService';

const LatestArticles = () => {
  // Get the 3 latest articles
  const latestArticles = getArticles({ trending: true });

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Health Articles</h2>
            <p className="text-muted-foreground">
              Evidence-based information on important health topics
            </p>
          </div>
          
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/health-articles" className="flex items-center gap-1">
              View All Articles
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
