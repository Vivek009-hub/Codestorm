
import React from 'react';
import { Pill, ThumbsUp, AlertTriangle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Medicine {
  id: number;
  name: string;
  genericName: string;
  category: string;
  description: string;
  usedFor: string[];
  sideEffects: string[];
  safetyRating: number;
}

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-0">
        <div className="flex items-center p-4 bg-medical-lightblue">
          <Pill className="h-10 w-10 text-medical-blue mr-4" />
          <div>
            <h3 className="font-semibold text-lg">{medicine.name}</h3>
            <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
          </div>
        </div>
        
        <div className="p-4">
          <Badge className="mb-2">{medicine.category}</Badge>
          
          <p className="text-sm mb-4 line-clamp-2">{medicine.description}</p>
          
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Used For</h4>
            <div className="flex flex-wrap gap-1">
              {medicine.usedFor.slice(0, 3).map((use, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {use}
                </Badge>
              ))}
              {medicine.usedFor.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{medicine.usedFor.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {medicine.safetyRating >= 4 ? (
                <ThumbsUp className="h-4 w-4 text-medical-green" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-medical-orange" />
              )}
              <span className="text-sm font-medium">
                {medicine.safetyRating >= 4 
                  ? 'Generally safe' 
                  : medicine.safetyRating >= 3 
                    ? 'Use with caution' 
                    : 'Consult doctor'}
              </span>
            </div>
            
            <Link 
              to={`/medicine-database/${medicine.id}`}
              className="text-medical-blue hover:underline text-sm flex items-center"
            >
              Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
