
import { Article } from '@/components/articles/ArticleCard';

// Sample article data
export const articlesData: Article[] = [
  {
    id: 1,
    title: 'Understanding Cardiovascular Health: Prevention and Treatment',
    excerpt: 'Learn about the latest research on heart health and how to reduce your risk of cardiovascular disease.',
    category: 'Heart Health',
    author: 'Dr. Sarah Johnson',
    publishDate: 'Jun 15, 2023',
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'The Connection Between Diet and Mental Well-being',
    excerpt: 'Discover how nutrition plays a crucial role in maintaining optimal mental health and emotional balance.',
    category: 'Mental Health',
    author: 'Dr. Michael Chen',
    publishDate: 'Jun 10, 2023',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'COVID-19 Variants: What You Need to Know',
    excerpt: 'Stay informed about the latest COVID-19 variants, their symptoms, and recommended precautions.',
    category: 'Infectious Disease',
    author: 'Dr. Emily Rodriguez',
    publishDate: 'Jun 5, 2023',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 4,
    title: 'Exercise and Aging: Staying Active in Your Golden Years',
    excerpt: 'How to maintain physical fitness and mobility as you age, with exercises tailored for older adults.',
    category: 'Fitness',
    author: 'Dr. Robert Kim',
    publishDate: 'May 30, 2023',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 5,
    title: 'Managing Diabetes Through Lifestyle Changes',
    excerpt: 'Effective strategies for controlling blood sugar levels through diet, exercise, and daily habits.',
    category: 'Diabetes',
    author: 'Dr. Lisa Martinez',
    publishDate: 'May 25, 2023',
    readTime: 9,
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 6,
    title: 'Sleep Hygiene: The Key to Better Rest',
    excerpt: 'Practical tips for improving your sleep quality and establishing healthy sleep patterns.',
    category: 'Sleep Health',
    author: 'Dr. James Wilson',
    publishDate: 'May 20, 2023',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 7,
    title: 'Nutrition for Children: Building Healthy Eating Habits',
    excerpt: 'Guide for parents on providing balanced nutrition and establishing good eating habits in children.',
    category: 'Pediatrics',
    author: 'Dr. Anna Thompson',
    publishDate: 'May 15, 2023',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 8,
    title: 'Stress Management Techniques for Modern Life',
    excerpt: 'Effective methods for reducing stress and improving mental well-being in today\'s fast-paced world.',
    category: 'Mental Health',
    author: 'Dr. David Lee',
    publishDate: 'May 10, 2023',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 9,
    title: 'Understanding Allergies and Immunotherapy',
    excerpt: 'Learn about different types of allergies, their causes, and modern treatment approaches including immunotherapy.',
    category: 'Allergies',
    author: 'Dr. Susan Wright',
    publishDate: 'May 5, 2023',
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1607074245269-c8fdad7a29e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

/**
 * Get all articles with optional filtering
 */
export const getArticles = ({ 
  search = '', 
  category = '',
  trending = false 
}: { 
  search?: string;
  category?: string;
  trending?: boolean;
}) => {
  let filtered = [...articlesData];
  
  // Filter by search term
  if (search) {
    const lowercaseTerm = search.toLowerCase();
    filtered = filtered.filter(
      article => 
        article.title.toLowerCase().includes(lowercaseTerm) ||
        article.excerpt.toLowerCase().includes(lowercaseTerm) ||
        article.author.toLowerCase().includes(lowercaseTerm)
    );
  }
  
  // Filter by category
  if (category) {
    filtered = filtered.filter(article => article.category === category);
  }
  
  // Filter trending articles (for demo purposes using most recent)
  if (trending) {
    filtered = filtered.slice(0, 3);
  }
  
  return filtered;
};

/**
 * Get article by ID
 */
export const getArticleById = (id: number) => {
  return articlesData.find(article => article.id === id);
};

/**
 * Get all unique categories
 */
export const getAllCategories = () => {
  return Array.from(new Set(articlesData.map(article => article.category)));
};
