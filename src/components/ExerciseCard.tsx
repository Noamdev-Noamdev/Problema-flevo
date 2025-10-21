import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock } from "lucide-react";

interface ExerciseCardProps {
  title: string;
  description: string;
  category: string;
  isPremium?: boolean;
}

const ExerciseCard = ({ title, description, category, isPremium = false }: ExerciseCardProps) => {
  return (
    <Card className={`transition-all hover:shadow-md ${isPremium ? "border-premium" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
              {category}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {isPremium && (
            <div className="rounded-full bg-premium/10 p-2">
              <Lock className="h-4 w-4 text-premium" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          variant={isPremium ? "outline" : "default"}
          className="w-full gap-2"
          disabled={isPremium}
        >
          <FileText className="h-4 w-4" />
          {isPremium ? "Premium oefening" : "Start oefening"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
