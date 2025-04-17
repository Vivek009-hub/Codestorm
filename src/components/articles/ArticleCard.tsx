
import React from 'react';
import { CalendarClock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: number;
  imageUrl: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-2 left-2">
          {article.category}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <Link to={`/health-articles/${article.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-medical-blue transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {article.excerpt}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{article.author}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <CalendarClock className="h-4 w-4" />
          <span>{article.publishDate} • {article.readTime} min read</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
