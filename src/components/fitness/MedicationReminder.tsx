
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Bell, Clock, Pill, Plus, Trash2, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  active: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Medication name is required' }),
  dosage: z.string().min(1, { message: 'Dosage is required' }),
  time: z.string().min(5, { message: 'Time is required' }),
});

const MedicationReminder = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [alarmSound] = useState(new Audio('https://assets.mixkit.co/active_storage/sfx/954/954-preview.mp3'));
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dosage: '',
      time: '',
    },
  });

  useEffect(() => {
    // Load medications from local storage
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
    
    // Initialize sound preference
    const soundPref = localStorage.getItem('medicationSoundEnabled');
    if (soundPref !== null) {
      setSoundEnabled(soundPref === 'true');
    }
    
    // Setup alarm check interval
    const checkInterval = setInterval(() => {
      checkAlarms();
    }, 10000); // Check every 10 seconds
    
    return () => {
      clearInterval(checkInterval);
      alarmSound.pause();
    };
  }, []);
  
  const checkAlarms = () => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
    
    medications.forEach(med => {
      if (med.active && med.time === currentTime) {
        triggerAlarm(med);
      }
    });
  };
  
  const triggerAlarm = (medication: Medication) => {
    // Create notification
    if (Notification.permission === "granted") {
      new Notification("Medication Reminder", {
        body: `Time to take ${medication.name} (${medication.dosage})`,
        icon: "/favicon.ico"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Medication Reminder", {
            body: `Time to take ${medication.name} (${medication.dosage})`,
            icon: "/favicon.ico"
          });
        }
      });
    }
    
    // Play sound if enabled
    if (soundEnabled) {
      try {
        alarmSound.currentTime = 0;
        alarmSound.play().catch(e => console.error("Could not play alarm sound:", e));
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
    
    // Show toast
    toast.warning(
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <div>
          <div className="font-medium">Medication Reminder</div>
          <div className="text-sm">Time to take {medication.name} ({medication.dosage})</div>
        </div>
      </div>,
      {
        duration: 10000,
        action: {
          label: "Dismiss",
          onClick: () => {
            alarmSound.pause();
          }
        }
      }
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: values.name,
      dosage: values.dosage,
      time: values.time,
      active: true,
    };
    
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    
    toast.success("Medication reminder added successfully!");
    form.reset();
  };
  
  const toggleAlarm = (id: string) => {
    const updatedMedications = medications.map(med => 
      med.id === id ? { ...med, active: !med.active } : med
    );
    
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    
    const medication = updatedMedications.find(med => med.id === id);
    if (medication) {
      toast.info(`Reminder for ${medication.name} ${medication.active ? 'activated' : 'deactivated'}`);
    }
  };
  
  const deleteMedication = (id: string) => {
    const updatedMedications = medications.filter(med => med.id !== id);
    setMedications(updatedMedications);
    localStorage.setItem('medications', JSON.stringify(updatedMedications));
    toast.success("Medication reminder deleted");
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('medicationSoundEnabled', (!soundEnabled).toString());
    toast.info(`Sound ${!soundEnabled ? 'enabled' : 'disabled'} for medication reminders`);
  };
  
  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          toast.success("Notification permission granted");
        } else {
          toast.error("Notification permission denied");
        }
      });
    } else {
      toast.info("Notification permission already granted");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medication Reminders</h1>
          <p className="text-muted-foreground">Never miss a dose with timely alerts</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="outline"
            onClick={requestNotificationPermission}
            className="flex gap-2 items-center"
          >
            <Bell className="h-4 w-4" />
            Enable Notifications
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Medication Form */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Add Medication</CardTitle>
            <CardDescription>Set up a new medication reminder</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Aspirin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 500mg, 1 tablet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Medication List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Medication Reminders</CardTitle>
            <CardDescription>
              {medications.length > 0 
                ? `${medications.length} reminder${medications.length !== 1 ? 's' : ''} scheduled` 
                : 'No reminders set'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {medications.length > 0 ? (
              <div className="space-y-4">
                {medications.map((medication) => (
                  <Card key={medication.id} className={`border-l-4 ${medication.active ? 'border-l-medical-blue' : 'border-l-gray-300'}`}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-full p-2 ${medication.active ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Pill className={`h-5 w-5 ${medication.active ? 'text-medical-blue' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm text-muted-foreground">{medication.dosage}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{medication.time}</span>
                        </div>
                        
                        <Badge variant={medication.active ? "default" : "outline"}>
                          {medication.active ? "Active" : "Disabled"}
                        </Badge>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleAlarm(medication.id)}
                            title={medication.active ? "Disable reminder" : "Enable reminder"}
                          >
                            <Bell className={`h-4 w-4 ${medication.active ? "text-medical-blue" : "text-gray-400"}`} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMedication(medication.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            title="Delete reminder"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto rounded-full bg-blue-100 p-3 w-fit mb-4">
                  <Bell className="h-6 w-6 text-medical-blue" />
                </div>
                <h3 className="font-medium text-lg">No medication reminders yet</h3>
                <p className="text-muted-foreground mt-1">Add your first medication reminder to get started</p>
              </div>
            )}
          </CardContent>
          
          {medications.length > 0 && (
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Medication reminders will trigger alerts at the specified times.
                Make sure to keep this page open for reminders to work properly.
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MedicationReminder;
