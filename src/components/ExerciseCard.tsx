import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock } from "lucide-react";

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  points?: number;
  estimatedTime?: string;
  isPremium?: boolean;
  year: number;
  richtingId: string;
  vakId: string;
  onderdeelId?: string;
}

const ExerciseCard = ({ 
  id,
  title, 
  description, 
  category,
  difficulty,
  points,
  estimatedTime,
  isPremium = false,
  year,
  richtingId,
  vakId,
  onderdeelId
}: ExerciseCardProps) => {
  const exerciseUrl = onderdeelId 
    ? `/jaar/${year}/${richtingId}/${vakId}/${onderdeelId}/oefening/${id}`
    : `/jaar/${year}/${richtingId}/${vakId}/oefening/${id}`;

  return (
    <Card className={`transition-all hover:shadow-md ${isPremium ? "border-premium" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {category}
              </span>
              {difficulty && (
                <span className="inline-block rounded-md bg-secondary/20 px-2 py-1 text-xs font-medium">
                  {difficulty}
                </span>
              )}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
            {(points || estimatedTime) && (
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                {points && <span>{points} punten</span>}
                {estimatedTime && <span>{estimatedTime}</span>}
              </div>
            )}
          </div>
          {isPremium && (
            <div className="rounded-full bg-premium/10 p-2">
              <Lock className="h-4 w-4 text-premium" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isPremium ? (
          <Button 
            variant="outline"
            className="w-full gap-2"
            disabled
          >
            <Lock className="h-4 w-4" />
            Premium oefening
          </Button>
        ) : (
          <Button 
            asChild
            variant="default"
            className="w-full gap-2"
          >
            <Link to={exerciseUrl}>
              <FileText className="h-4 w-4" />
              Start oefening
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
