
import React, { useState, useEffect } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Apple, 
  Dumbbell, 
  Bell, 
  Activity,
  SplitSquareVertical,
  ChevronLeft
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/fitness/Dashboard';
import DietPlan from '@/components/fitness/DietPlan';
import WorkoutPlan from '@/components/fitness/WorkoutPlan';
import MedicationReminder from '@/components/fitness/MedicationReminder';
import BMICalculator from '@/components/fitness/BMICalculator';

interface FitnessTrackerProps {
  standalone?: boolean;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ standalone = false }) => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load BMI from localStorage if available
    const savedBMI = localStorage.getItem('userBMI');
    const savedCategory = localStorage.getItem('bmiCategory');
    
    if (savedBMI) {
      setBmi(parseFloat(savedBMI));
    }
    
    if (savedCategory) {
      setBmiCategory(savedCategory);
    }
  }, []);

  // Update BMI category when BMI changes
  useEffect(() => {
    if (bmi !== null) {
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 18.5 && bmi < 25) category = 'Normal';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiCategory(category);
      localStorage.setItem('bmiCategory', category);
    }
  }, [bmi]);

  // Function to be called from BMI calculator component
  const updateBMI = (newBMI: number) => {
    setBmi(newBMI);
    localStorage.setItem('userBMI', newBMI.toString());
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex">
        <SidebarProvider>
          <div className="flex w-full">
            {/* Sidebar Toggle Button - Outside of Sidebar */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar} 
              className={`fixed z-30 top-20 ${sidebarVisible ? 'left-64' : 'left-4'} transition-all duration-300 ease-in-out bg-background border shadow-sm`}
            >
              <SplitSquareVertical className="h-5 w-5" />
            </Button>
            
            {/* Sidebar */}
            {sidebarVisible && (
              <Sidebar className="transition-all duration-300 ease-in-out">
                <SidebarHeader className="flex items-center gap-2 p-4">
                  <Activity className="h-24 w-6 text-medical-blue" />
                  <h2 className="text-xl font-semibold">Fitness Tracker</h2>

                </SidebarHeader>
                
                <SidebarContent>
                  {/* BMI Calculator in Sidebar */}
                  <div className="px-4 mb-4">
                    <BMICalculator updateBMI={updateBMI} />
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  {/* Navigation Menu */}
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        tooltip="Dashboard"
                        isActive={window.location.pathname === '/fitness-tracker' || window.location.pathname === '/fitness'}
                      >
                        <Link to={standalone ? "/fitness-tracker" : "/fitness-tracker"}>
                          <LayoutDashboard className="h-5 w-5" />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        tooltip="Diet Plan"
                        isActive={window.location.pathname.includes('/diet')}
                      >
                        <Link to={standalone ? "/fitness-tracker/diet" : "/fitness-tracker/diet"}>
                          <Apple className="h-5 w-5" />
                          <span>Diet Plan</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        tooltip="Workout Plan"
                        isActive={window.location.pathname.includes('/workout')}
                      >
                        <Link to={standalone ? "/fitness-tracker/workout" : "/fitness-tracker/workout"}>
                          <Dumbbell className="h-5 w-5" />
                          <span>Workout Plan</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        tooltip="Medication Reminders"
                        isActive={window.location.pathname.includes('/medication')}
                      >
                        <Link to={standalone ? "/fitness-tracker/medication" : "/fitness-tracker/medication"}>
                          <Bell className="h-5 w-5" />
                          <span>Medication Reminders</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarContent>
              </Sidebar>
            )}
            
            {/* Content Area */}
            <div className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${sidebarVisible ? 'ml-0' : 'ml-0'}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/diet" element={<DietPlan bmiCategory={bmiCategory} />} />
                <Route path="/workout" element={<WorkoutPlan bmiCategory={bmiCategory} />} />
                <Route path="/medication" element={<MedicationReminder />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </main>
    </div>
  );
};

export default FitnessTracker;
