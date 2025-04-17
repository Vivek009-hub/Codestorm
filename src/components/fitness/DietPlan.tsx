
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Coffee, Utensils, Moon } from 'lucide-react';

interface DietPlanProps {
  bmiCategory: string;
}

interface MealPlan {
  breakfast: string[];
  snacks: string[];
  lunch: string[];
  dinner: string[];
}

const DietPlan: React.FC<DietPlanProps> = ({ bmiCategory }) => {
  // Diet plans based on BMI category
  const dietPlans: Record<string, MealPlan> = {
    'Underweight': {
      breakfast: [
        'Protein-rich smoothie with banana, peanut butter and milk',
        'Oatmeal with nuts, seeds, and dried fruits',
        'Whole grain toast with avocado and eggs'
      ],
      snacks: [
        'Greek yogurt with honey and nuts',
        'Trail mix with dried fruits and nuts',
        'Cheese and fruit plate'
      ],
      lunch: [
        'Chicken or tuna sandwich with avocado',
        'Pasta with olive oil, vegetables and cheese',
        'Rice bowl with beans, avocado and grilled vegetables'
      ],
      dinner: [
        'Salmon with sweet potato and vegetables',
        'Chicken stir-fry with rice and vegetables',
        'Lentil soup with whole grain bread'
      ]
    },
    'Normal': {
      breakfast: [
        'Greek yogurt with berries and a sprinkle of granola',
        'Vegetable omelet with toast',
        'Overnight oats with fresh fruit'
      ],
      snacks: [
        'Apple slices with almond butter',
        'Carrot sticks with hummus',
        'Small handful of mixed nuts'
      ],
      lunch: [
        'Quinoa bowl with roasted vegetables and chickpeas',
        'Mixed green salad with grilled chicken',
        'Vegetable soup with whole grain crackers'
      ],
      dinner: [
        'Baked fish with steamed vegetables and brown rice',
        'Turkey breast with sweet potatoes and green beans',
        'Bean and vegetable stir-fry'
      ]
    },
    'Overweight': {
      breakfast: [
        'Vegetable egg white omelet',
        'Plain Greek yogurt with berries',
        'Whole grain toast with small amount of avocado'
      ],
      snacks: [
        'Cucumber slices with Greek yogurt dip',
        'Celery sticks with small amount of hummus',
        'Small apple'
      ],
      lunch: [
        'Large salad with lean protein and light dressing',
        'Vegetable soup with lean protein',
        'Lettuce wraps with lean protein and vegetables'
      ],
      dinner: [
        'Grilled fish with large serving of steamed vegetables',
        'Lean chicken breast with roasted vegetables',
        'Vegetable stir-fry with small serving of brown rice'
      ]
    },
    'Obese': {
      breakfast: [
        'Egg whites with spinach and tomatoes',
        'Protein smoothie with berries (no added sugar)',
        'Plain oatmeal with cinnamon and small amount of berries'
      ],
      snacks: [
        'Small protein shake',
        'Cucumber slices',
        'Celery sticks'
      ],
      lunch: [
        'Large green salad with lean protein and vinegar dressing',
        'Cauliflower rice bowl with vegetables and lean protein',
        'Vegetable soup with lean protein'
      ],
      dinner: [
        'Grilled lean protein with large serving of non-starchy vegetables',
        'Zucchini noodles with lean protein and tomato sauce',
        'Large salad with grilled chicken and light dressing'
      ]
    }
  };

  // Default to Normal if no BMI category is provided
  const currentPlan = dietPlans[bmiCategory] || dietPlans['Normal'];
  
  // Get BMI-specific advice
  const getBMIAdvice = () => {
    switch(bmiCategory) {
      case 'Underweight':
        return "This plan focuses on nutrient-dense foods to help you gain healthy weight gradually. Include protein-rich foods, healthy fats, and complex carbohydrates.";
      case 'Normal':
        return "This plan is designed to maintain your healthy weight with balanced nutrition. Focus on variety and portion control.";
      case 'Overweight':
        return "This plan emphasizes nutrient-dense foods with moderate calorie restriction to support gradual weight loss. Focus on high-volume, low-calorie foods.";
      case 'Obese':
        return "This plan provides significant calorie control with nutrient-dense foods to support healthy weight loss. Consult with a healthcare provider before starting.";
      default:
        return "This balanced nutrition plan supports general health and wellbeing.";
    }
  };

  // Get meal icon and background color based on meal type
  const getMealStyle = (mealType: string) => {
    switch(mealType) {
      case 'breakfast':
        return { icon: Coffee, bgColor: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-200' };
      case 'snacks':
        return { icon: Apple, bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-200' };
      case 'lunch':
        return { icon: Utensils, bgColor: 'bg-orange-100', textColor: 'text-orange-800', borderColor: 'border-orange-200' };
      case 'dinner':
        return { icon: Moon, bgColor: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-200' };
      default:
        return { icon: Coffee, bgColor: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-200' };
    }
  };

  const renderMealOptions = (meals: string[], mealType: string) => {
    const { icon: Icon, bgColor, textColor, borderColor } = getMealStyle(mealType);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {meals.map((meal, index) => (
          <Card 
            key={index} 
            className={`h-full transform transition-all hover:-translate-y-1 hover:shadow-md ${borderColor} border-2`}
          >
            <CardContent className="p-0">
              <div className={`${bgColor} p-3 flex items-center gap-3`}>
                <div className="bg-white rounded-full p-2 shadow-sm">
                  <Icon className={`h-5 w-5 ${textColor}`} />
                </div>
                <h3 className={`font-semibold ${textColor}`}>Option {index + 1}</h3>
              </div>
              <div className="p-4">
                <p>{meal}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Personalized Diet Plan</h1>
      <p className="mb-6 text-muted-foreground">Based on your BMI category: {bmiCategory || 'Not calculated'}</p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Nutrition Guidance</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{getBMIAdvice()}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="bg-blue-50">Personalized</Badge>
            <Badge variant="outline" className="bg-green-50">Balanced</Badge>
            <Badge variant="outline" className="bg-purple-50">Nutritious</Badge>
            <Badge variant="outline" className="bg-orange-50">Sustainable</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="breakfast">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="breakfast" className="flex gap-2 items-center">
            <Coffee className="h-4 w-4" />
            <span>Breakfast</span>
          </TabsTrigger>
          <TabsTrigger value="snacks" className="flex gap-2 items-center">
            <Apple className="h-4 w-4" />
            <span>Snacks</span>
          </TabsTrigger>
          <TabsTrigger value="lunch" className="flex gap-2 items-center">
            <Utensils className="h-4 w-4" />
            <span>Lunch</span>
          </TabsTrigger>
          <TabsTrigger value="dinner" className="flex gap-2 items-center">
            <Moon className="h-4 w-4" />
            <span>Dinner</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakfast">
          <h2 className="text-2xl font-bold mb-4">Breakfast Options</h2>
          {renderMealOptions(currentPlan.breakfast, 'breakfast')}
        </TabsContent>
        
        <TabsContent value="snacks">
          <h2 className="text-2xl font-bold mb-4">Snack Options</h2>
          {renderMealOptions(currentPlan.snacks, 'snacks')}
        </TabsContent>
        
        <TabsContent value="lunch">
          <h2 className="text-2xl font-bold mb-4">Lunch Options</h2>
          {renderMealOptions(currentPlan.lunch, 'lunch')}
        </TabsContent>
        
        <TabsContent value="dinner">
          <h2 className="text-2xl font-bold mb-4">Dinner Options</h2>
          {renderMealOptions(currentPlan.dinner, 'dinner')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DietPlan;
