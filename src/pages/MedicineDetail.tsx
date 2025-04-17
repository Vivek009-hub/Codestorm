
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft,
  Pill,
  ThumbsUp,
  AlertTriangle,
  BookOpen,
  FileText,
  Stethoscope 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getMedicineById } from '@/services/medicineService';
import { toast } from 'sonner';

const MedicineDetail = () => {
  const { id } = useParams();
  const medicineId = Number(id);
  
  // Get medicine details
  const medicine = getMedicineById(medicineId);

  // If medicine not found
  if (!medicine) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Medicine Not Found</h1>
            <p className="mb-6">We couldn't find the medicine you're looking for.</p>
            <Button asChild>
              <Link to="/medicine-database">Back to Medicine Database</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Handle bookmark medicine
  const handleBookmark = () => {
    toast.success(`${medicine.name} added to bookmarks`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-50 to-white py-8">
          <div className="container-custom">
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4 pl-1">
                <Link to="/medicine-database" className="flex items-center text-medical-blue hover:text-medical-blue/80">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Medicine Database
                </Link>
              </Button>
              
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-medical-lightblue p-4 rounded-full mr-4">
                    <Pill className="h-10 w-10 text-medical-blue" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{medicine.name}</h1>
                    <p className="text-lg text-muted-foreground">{medicine.genericName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button onClick={handleBookmark} variant="outline">
                    Save for Later
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-medical-blue text-white">{medicine.category}</Badge>
                <div className="flex items-center border rounded-full px-3 py-1 text-sm">
                  {medicine.safetyRating >= 4 ? (
                    <ThumbsUp className="h-4 w-4 text-medical-green mr-1" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-medical-orange mr-1" />
                  )}
                  <span>
                    {medicine.safetyRating >= 4 
                      ? 'Generally safe' 
                      : medicine.safetyRating >= 3 
                        ? 'Use with caution' 
                        : 'Consult doctor'}
                  </span>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="uses" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Uses & Side Effects</span>
                </TabsTrigger>
                <TabsTrigger value="medical" className="flex items-center gap-1">
                  <Stethoscope className="h-4 w-4" />
                  <span>Medical Info</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-semibold">Description</h2>
                  </CardHeader>
                  <CardContent>
                    <p>{medicine.description}</p>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <h2 className="text-xl font-semibold">Used For</h2>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {medicine.usedFor.map((use, index) => (
                          <li key={index}>{use}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <h2 className="text-xl font-semibold">Common Side Effects</h2>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {medicine.sideEffects.map((effect, index) => (
                          <li key={index}>{effect}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="uses" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-semibold">Therapeutic Uses</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="font-medium">This medication is used to treat:</p>
                      <ul className="list-disc pl-5 space-y-2">
                        {medicine.usedFor.map((use, index) => (
                          <li key={index}>{use}</li>
                        ))}
                      </ul>
                      
                      <p className="mt-4 text-sm text-muted-foreground">
                        Always follow your doctor's prescription and recommendations for dosage and frequency.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-semibold">Side Effects</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>While {medicine.name} is effective for its intended uses, it may cause some side effects:</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Common Side Effects:</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {medicine.sideEffects.map((effect, index) => (
                              <li key={index}>{effect}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">When to Contact Your Doctor:</h3>
                          <p>Contact your healthcare provider immediately if you experience:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Severe allergic reactions (rash, itching, swelling)</li>
                            <li>Difficulty breathing</li>
                            <li>Extreme dizziness or fainting</li>
                            <li>Any side effect that seems severe or concerning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-semibold">Medical Information</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Brand Name</h3>
                          <p>{medicine.name}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Generic Name</h3>
                          <p>{medicine.genericName}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Category</h3>
                          <p>{medicine.category}</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground">Safety Rating</h3>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <div 
                                  key={rating}
                                  className={`w-5 h-5 rounded-full mr-1 ${
                                    rating <= medicine.safetyRating 
                                      ? 'bg-medical-green' 
                                      : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2">({medicine.safetyRating}/5)</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Precautions & Warnings</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Consult with a healthcare professional before use</li>
                          <li>Do not use if you have known allergies to similar medications</li>
                          <li>Store at room temperature away from moisture and heat</li>
                          <li>Keep out of reach of children</li>
                          {medicine.safetyRating < 4 && (
                            <li className="text-medical-orange font-medium">
                              This medication requires careful monitoring by your doctor
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Interactions</h3>
                        <p>
                          This medication may interact with other drugs. Inform your doctor about all medications
                          you are currently taking, including over-the-counter drugs, vitamins, and herbal supplements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MedicineDetail;
