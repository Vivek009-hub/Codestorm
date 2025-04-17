
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Clock, Check } from 'lucide-react';

interface WorkoutPlanProps {
  bmiCategory: string;
}

interface Exercise {
  name: string;
  duration: string;
  sets?: string;
  reps?: string;
  description: string;
  intensity: 'Light' | 'Moderate' | 'High';
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  rest?: boolean;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ bmiCategory }) => {
  // Workout plans based on BMI category
  const getWorkoutPlan = (): WorkoutDay[] => {
    switch(bmiCategory) {
      case 'Underweight':
        return [
          {
            day: 'Monday',
            focus: 'Strength - Upper Body',
            exercises: [
              { name: 'Push-ups', duration: '3 sets', sets: '3', reps: '8-12', description: 'Focus on proper form, use knee push-ups if needed', intensity: 'Moderate' },
              { name: 'Dumbbell rows', duration: '3 sets', sets: '3', reps: '10-12', description: 'Use lighter weights with proper form', intensity: 'Moderate' },
              { name: 'Shoulder press', duration: '3 sets', sets: '3', reps: '8-10', description: 'Start with lighter weights', intensity: 'Moderate' },
              { name: 'Bicep curls', duration: '3 sets', sets: '3', reps: '10-12', description: 'Focus on controlled movement', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Light Cardio',
            exercises: [
              { name: 'Walking', duration: '20 minutes', description: 'Moderate pace', intensity: 'Light' },
              { name: 'Stationary bike', duration: '15 minutes', description: 'Low resistance', intensity: 'Light' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Strength - Lower Body',
            exercises: [
              { name: 'Bodyweight squats', duration: '3 sets', sets: '3', reps: '12-15', description: 'Focus on depth and form', intensity: 'Moderate' },
              { name: 'Lunges', duration: '3 sets', sets: '3', reps: '10 each leg', description: 'Bodyweight only', intensity: 'Moderate' },
              { name: 'Calf raises', duration: '3 sets', sets: '3', reps: '15-20', description: 'Use support for balance', intensity: 'Light' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          },
          {
            day: 'Friday',
            focus: 'Full Body',
            exercises: [
              { name: 'Dumbbell squats', duration: '3 sets', sets: '3', reps: '10-12', description: 'Light weights', intensity: 'Moderate' },
              { name: 'Assisted pull-ups', duration: '3 sets', sets: '3', reps: '6-8', description: 'Use resistance bands for assistance', intensity: 'Moderate' },
              { name: 'Bench press', duration: '3 sets', sets: '3', reps: '8-10', description: 'Start with lighter weights', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Yoga', duration: '20 minutes', description: 'Focus on stretching', intensity: 'Light' },
              { name: 'Light walking', duration: '20 minutes', description: 'Easy pace', intensity: 'Light' }
            ]
          },
          {
            day: 'Sunday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          }
        ];
        
      case 'Normal':
        return [
          {
            day: 'Monday',
            focus: 'Strength - Upper Body',
            exercises: [
              { name: 'Push-ups', duration: '3 sets', sets: '3', reps: '10-15', description: 'Full push-ups or modified as needed', intensity: 'Moderate' },
              { name: 'Dumbbell rows', duration: '3 sets', sets: '3', reps: '12-15', description: 'Moderate weight', intensity: 'Moderate' },
              { name: 'Shoulder press', duration: '3 sets', sets: '3', reps: '10-12', description: 'Moderate weight', intensity: 'Moderate' },
              { name: 'Tricep dips', duration: '3 sets', sets: '3', reps: '12-15', description: 'Body weight', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Cardio',
            exercises: [
              { name: 'Running/jogging', duration: '25 minutes', description: 'Moderate intensity', intensity: 'Moderate' },
              { name: 'Jump rope', duration: '10 minutes', description: 'Intervals', intensity: 'High' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Strength - Lower Body',
            exercises: [
              { name: 'Squats', duration: '4 sets', sets: '4', reps: '12-15', description: 'Bodyweight or with dumbbells', intensity: 'Moderate' },
              { name: 'Lunges', duration: '3 sets', sets: '3', reps: '12 each leg', description: 'With or without weights', intensity: 'Moderate' },
              { name: 'Calf raises', duration: '3 sets', sets: '3', reps: '15-20', description: 'With light weights', intensity: 'Moderate' },
              { name: 'Glute bridges', duration: '3 sets', sets: '3', reps: '15-20', description: 'Body weight or with weight', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Yoga', duration: '30 minutes', description: 'Flexibility focus', intensity: 'Light' },
              { name: 'Walking', duration: '20 minutes', description: 'Brisk pace', intensity: 'Light' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Strength - Full Body',
            exercises: [
              { name: 'Deadlifts', duration: '3 sets', sets: '3', reps: '10-12', description: 'Light to moderate weight', intensity: 'Moderate' },
              { name: 'Push-ups', duration: '3 sets', sets: '3', reps: '10-15', description: 'Full or modified', intensity: 'Moderate' },
              { name: 'Pull-ups', duration: '3 sets', sets: '3', reps: '6-10', description: 'Assisted if needed', intensity: 'Moderate' },
              { name: 'Planks', duration: '3 sets', sets: '3', reps: '30-60 sec', description: 'Hold position', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Cardio & Core',
            exercises: [
              { name: 'HIIT workout', duration: '20 minutes', description: '30 seconds on, 30 seconds rest', intensity: 'High' },
              { name: 'Core circuit', duration: '15 minutes', description: 'Various ab exercises', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Sunday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          }
        ];
        
      case 'Overweight':
        return [
          {
            day: 'Monday',
            focus: 'Cardio & Strength',
            exercises: [
              { name: 'Brisk walking', duration: '30 minutes', description: 'Moderate pace', intensity: 'Moderate' },
              { name: 'Bodyweight squats', duration: '3 sets', sets: '3', reps: '12-15', description: 'Focus on form', intensity: 'Moderate' },
              { name: 'Modified push-ups', duration: '3 sets', sets: '3', reps: '8-12', description: 'Wall or knee push-ups', intensity: 'Moderate' },
              { name: 'Standing rows', duration: '3 sets', sets: '3', reps: '12-15', description: 'With resistance band', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Cardio',
            exercises: [
              { name: 'Walking intervals', duration: '35 minutes', description: '5 min warm-up, 1 min fast/1 min moderate x15, 5 min cooldown', intensity: 'Moderate' },
              { name: 'Stationary bike', duration: '20 minutes', description: 'Low impact', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Strength - Full Body',
            exercises: [
              { name: 'Sit to stand', duration: '3 sets', sets: '3', reps: '12-15', description: 'Using a chair', intensity: 'Moderate' },
              { name: 'Wall push-ups', duration: '3 sets', sets: '3', reps: '12-15', description: 'Focus on form', intensity: 'Light' },
              { name: 'Resistance band pulls', duration: '3 sets', sets: '3', reps: '15', description: 'For upper back', intensity: 'Moderate' },
              { name: 'Standing side bends', duration: '3 sets', sets: '3', reps: '15 each side', description: 'For obliques', intensity: 'Light' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Gentle yoga', duration: '25 minutes', description: 'Stretching focus', intensity: 'Light' },
              { name: 'Walking', duration: '20 minutes', description: 'Easy pace', intensity: 'Light' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Cardio & Core',
            exercises: [
              { name: 'Swimming or water walking', duration: '30 minutes', description: 'Low impact', intensity: 'Moderate' },
              { name: 'Modified planks', duration: '3 sets', sets: '3', reps: '20-30 sec', description: 'On knees if needed', intensity: 'Moderate' },
              { name: 'Seated bicycle twists', duration: '3 sets', sets: '3', reps: '12 each side', description: 'For obliques', intensity: 'Light' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Longer Cardio',
            exercises: [
              { name: 'Longer walk', duration: '45-60 minutes', description: 'Moderate pace, flat terrain', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Sunday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          }
        ];
        
      case 'Obese':
        return [
          {
            day: 'Monday',
            focus: 'Low Impact Cardio',
            exercises: [
              { name: 'Walking', duration: '20 minutes', description: 'Comfortable pace', intensity: 'Light' },
              { name: 'Chair exercises', duration: '15 minutes', description: 'Seated movements', intensity: 'Light' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Gentle Strength',
            exercises: [
              { name: 'Wall push-ups', duration: '2 sets', sets: '2', reps: '8-10', description: 'Standing, using wall for support', intensity: 'Light' },
              { name: 'Seated leg lifts', duration: '2 sets', sets: '2', reps: '10 each leg', description: 'While sitting', intensity: 'Light' },
              { name: 'Arm raises', duration: '2 sets', sets: '2', reps: '12-15', description: 'With or without light weights', intensity: 'Light' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Water Exercise',
            exercises: [
              { name: 'Water walking', duration: '30 minutes', description: 'In shallow end', intensity: 'Light' },
              { name: 'Water arm movements', duration: '15 minutes', description: 'Using water resistance', intensity: 'Light' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          },
          {
            day: 'Friday',
            focus: 'Seated & Standing',
            exercises: [
              { name: 'Seated marching', duration: '3 sets', sets: '3', reps: '30 seconds', description: 'Lifting knees while seated', intensity: 'Light' },
              { name: 'Standing wall slides', duration: '2 sets', sets: '2', reps: '8-10', description: 'Back against wall', intensity: 'Light' },
              { name: 'Seated rows', duration: '2 sets', sets: '2', reps: '12', description: 'With resistance band', intensity: 'Light' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Gentle Movement',
            exercises: [
              { name: 'Walking', duration: '25 minutes', description: 'Broken into 3 segments if needed', intensity: 'Light' },
              { name: 'Gentle stretching', duration: '15 minutes', description: 'Full body', intensity: 'Light' }
            ]
          },
          {
            day: 'Sunday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          }
        ];
        
      default:
        return [
          {
            day: 'Monday',
            focus: 'Cardio',
            exercises: [
              { name: 'Walking or jogging', duration: '30 minutes', description: 'Moderate pace', intensity: 'Moderate' },
              { name: 'Jumping jacks', duration: '3 sets', sets: '3', reps: '30 seconds', description: 'Rest between sets', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Strength Training',
            exercises: [
              { name: 'Push-ups', duration: '3 sets', sets: '3', reps: '10', description: 'Modified if needed', intensity: 'Moderate' },
              { name: 'Squats', duration: '3 sets', sets: '3', reps: '15', description: 'Bodyweight', intensity: 'Moderate' },
              { name: 'Lunges', duration: '3 sets', sets: '3', reps: '10 each leg', description: 'Bodyweight', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Rest or Yoga',
            exercises: [
              { name: 'Gentle yoga', duration: '30 minutes', description: 'Focus on stretching', intensity: 'Light' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Cardio',
            exercises: [
              { name: 'Brisk walking', duration: '30 minutes', description: 'Faster pace', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Strength Training',
            exercises: [
              { name: 'Planks', duration: '3 sets', sets: '3', reps: '30 seconds', description: 'Rest between sets', intensity: 'Moderate' },
              { name: 'Bicycle crunches', duration: '3 sets', sets: '3', reps: '12 each side', description: 'For core', intensity: 'Moderate' },
              { name: 'Dumbbell rows', duration: '3 sets', sets: '3', reps: '12 each arm', description: 'Light weight', intensity: 'Moderate' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Active Recovery',
            exercises: [
              { name: 'Swimming or cycling', duration: '30 minutes', description: 'Easy pace', intensity: 'Light' }
            ]
          },
          {
            day: 'Sunday',
            focus: 'Rest Day',
            exercises: [],
            rest: true
          }
        ];
    }
  };

  const workoutPlan = getWorkoutPlan();
  
  // Get BMI-specific advice
  const getBMIAdvice = () => {
    switch(bmiCategory) {
      case 'Underweight':
        return "This plan focuses on strength training to build muscle mass while including light cardio for cardiovascular health. Rest and recovery are important for muscle development.";
      case 'Normal':
        return "This balanced plan includes both strength training and cardio to maintain fitness and overall health. Adjust intensity as needed based on your fitness level.";
      case 'Overweight':
        return "This plan emphasizes regular cardio with strength training to support weight loss and build muscle. Low-impact options are included to protect joints.";
      case 'Obese':
        return "This gentle plan focuses on low-impact movement to improve mobility and build exercise tolerance. Always consult with a healthcare provider before starting any exercise program.";
      default:
        return "This general fitness plan includes a mix of cardio, strength training, and flexibility work for overall health.";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Personalized Workout Plan</h1>
      <p className="mb-6 text-muted-foreground">Based on your BMI category: {bmiCategory || 'Not calculated'}</p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exercise Recommendations</CardTitle>
          <CardDescription>Tailored to your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{getBMIAdvice()}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="bg-blue-50">Progressive</Badge>
            <Badge variant="outline" className="bg-green-50">Safe</Badge>
            <Badge variant="outline" className="bg-purple-50">Balanced</Badge>
            <Badge variant="outline" className="bg-orange-50">Adaptable</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="Monday">
        <TabsList className="mb-8 max-w-full overflow-auto">
          {workoutPlan.map((day) => (
            <TabsTrigger key={day.day} value={day.day}>{day.day}</TabsTrigger>
          ))}
        </TabsList>
        
        {workoutPlan.map((day) => (
          <TabsContent key={day.day} value={day.day}>
            <h2 className="text-2xl font-bold mb-2">{day.day}</h2>
            <h3 className="text-lg text-muted-foreground mb-6">Focus: {day.focus}</h3>
            
            {day.rest ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Rest Day</h3>
                      <p className="text-muted-foreground">
                        Take time to recover. Rest is essential for muscle recovery and overall progress.
                        Stay hydrated and get enough sleep.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {day.exercises.map((exercise, index) => (
                  <Card key={index} className="h-full overflow-hidden border-t-4 border-medical-blue">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${exercise.intensity === 'Light' ? 'bg-green-50 text-green-700' : 
                              exercise.intensity === 'Moderate' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-red-50 text-red-700'
                            }
                          `}
                        >
                          {exercise.intensity} Intensity
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {exercise.duration}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      {exercise.sets && exercise.reps && (
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="secondary">{exercise.sets} sets</Badge>
                          <Badge variant="secondary">{exercise.reps} reps</Badge>
                        </div>
                      )}
                      <p className="text-sm">{exercise.description}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-0">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Track this exercise
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkoutPlan;
