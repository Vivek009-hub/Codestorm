import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

interface BMICalculatorProps {
  updateBMI?: (bmi: number) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ updateBMI }) => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    // BMI = weight(kg) / height(m)²
    const heightInMeters = height / 100;
    const calculatedBMI = weight / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(calculatedBMI.toFixed(1));
    
    setBmi(roundedBMI);
    
    // Determine BMI category
    let newCategory = '';
    if (roundedBMI < 18.5) newCategory = 'Underweight';
    else if (roundedBMI >= 18.5 && roundedBMI < 25) newCategory = 'Normal';
    else if (roundedBMI >= 25 && roundedBMI < 30) newCategory = 'Overweight';
    else newCategory = 'Obese';
    
    setCategory(newCategory);
    updateBMI?.(roundedBMI);
    
    // Save to localStorage
    localStorage.setItem('userBMI', roundedBMI.toString());
    localStorage.setItem('bmiCategory', newCategory);
  };
  
  const getCategoryColor = () => {
    switch(category) {
      case 'Underweight': return 'text-blue-500';
      case 'Normal': return 'text-green-500';
      case 'Overweight': return 'text-yellow-600';
      case 'Obese': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Calculate the position of the BMI indicator (as percentage)
  const getBmiIndicatorPosition = () => {
    if (bmi === null) return 0;
    // Map BMI to position percentage (consider 15-40 as the full range)
    const minBmi = 15;
    const maxBmi = 40;
    const position = ((bmi - minBmi) / (maxBmi - minBmi)) * 100;
    // Clamp position between 0-100%
    return Math.max(0, Math.min(100, position));
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-center">BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Height: {height} cm</span>
                  <span className="text-xs text-muted-foreground">(100-250 cm)</span>
                </div>
                <Slider
                  value={[height]}
                  min={100}
                  max={250}
                  step={1}
                  onValueChange={(value) => setHeight(value[0])}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Weight: {weight} kg</span>
                  <span className="text-xs text-muted-foreground">(30-200 kg)</span>
                </div>
                <Slider
                  value={[weight]}
                  min={30}
                  max={200}
                  step={1}
                  onValueChange={(value) => setWeight(value[0])}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mt-4">
              <div className="text-lg font-semibold mb-1">Your BMI: {bmi !== null ? bmi : '-'}</div>
              <div className={`text-sm font-medium ${getCategoryColor()}`}>
                {category}
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="space-y-2">
                  {/* <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div> */}
                  <div className="relative">
                    <div 
                      className="h-2 w-full rounded-full" 
                      style={{ 
                        background: `linear-gradient(to right, 
                          #3b82f6 0%, #3b82f6 18.5%, 
                          #10b981 18.5%, #10b981 25%, 
                          #f59e0b 25%, #f59e0b 30%, 
                          #ef4444 30%, #ef4444 100%)`
                      }}
                    />
                    {/* BMI indicator */}
                    <div 
                      className="absolute top-0 w-2 h-5 bg-primary border-2 border-white rounded-full transform -translate-x-1/2 shadow-md"
                      style={{ 
                        left: `${getBmiIndicatorPosition()}%`,
                        marginTop: '-4px'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-2">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-blue-100 text-xs text-muted-foreground">
                <p>BMI is a screening tool, not a diagnostic of body fatness or health.</p>
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICalculator;