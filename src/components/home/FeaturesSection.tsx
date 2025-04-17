
import React from 'react';
import { Bot, Database, BookOpen, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot className="h-10 w-10 text-medical-blue" />,
      title: 'AI Health Consultation',
      description: 'Get instant answers to your health questions from our sophisticated AI assistant trained on reliable medical data.'
    },
    {
      icon: <Database className="h-10 w-10 text-medical-blue" />,
      title: 'Comprehensive Medicine Database',
      description: 'Access detailed information on over 1,000 medications, including uses, side effects, and precautions.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-medical-blue" />,
      title: 'Expert Health Articles',
      description: 'Stay informed with evidence-based articles on various health topics written by healthcare professionals.'
    },
    {
      icon: <Users className="h-10 w-10 text-medical-blue" />,
      title: 'Community Support',
      description: 'Connect with others facing similar health challenges through our moderated community forums.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Complete Health Information Resource
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide reliable health tools and resources to help you make informed decisions about your wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-100">
              <CardContent className="pt-6">
                <div className="rounded-full bg-medical-lightblue p-3 w-max mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
