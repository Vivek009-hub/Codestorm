
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Check, Dumbbell, Droplets, Apple, Heart, Moon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const healthActivities = [
  {
    time: '7:00 AM',
    title: 'Morning Walk',
    description: '30 minutes of brisk walking',
    icon: <Activity className="text-green-500" />
  },
  {
    time: '8:00 AM',
    title: 'Breakfast',
    description: 'Oatmeal with fruits and nuts',
    icon: <Apple className="text-red-500" />
  },
  {
    time: '10:00 AM',
    title: 'Hydration Check',
    description: 'Drank 500ml water',
    icon: <Droplets className="text-blue-500" />
  },
  {
    time: '12:30 PM',
    title: 'Lunch',
    description: 'Grilled chicken salad with vegetables',
    icon: <Apple className="text-orange-500" />
  },
  {
    time: '3:00 PM',
    title: 'Workout Session',
    description: '45 minutes strength training',
    icon: <Dumbbell className="text-purple-500" />
  },
  {
    time: '6:00 PM',
    title: 'Evening Walk',
    description: '20 minutes after dinner',
    icon: <Activity className="text-green-500" />
  },
  {
    time: '10:00 PM',
    title: 'Sleep Time',
    description: '8 hours planned rest',
    icon: <Moon className="text-indigo-500" />
  }
];

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Health Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Step Goal</CardTitle>
            <CardDescription>Progress today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">7,542</span>
              <span className="text-sm text-muted-foreground">Goal: 10,000</span>
            </div>
            <Progress value={75} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Water Intake</CardTitle>
            <CardDescription>Progress today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">1.2L</span>
              <span className="text-sm text-muted-foreground">Goal: 2.5L</span>
            </div>
            <Progress value={48} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Heart Rate</CardTitle>
            <CardDescription>Last measured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-2xl font-bold">72</span>
              <span className="text-sm text-muted-foreground">bpm</span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Normal range</div>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Today's Health Activity</h2>
      
      <div className="space-y-4">
        {healthActivities.map((activity, index) => (
          <Card key={index} className="overflow-hidden border-l-4 border-medical-blue hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
