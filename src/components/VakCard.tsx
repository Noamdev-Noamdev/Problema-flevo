import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Book, Layers } from "lucide-react";

interface VakCardProps {
  id: string;
  name: string;
  description: string;
  year: number;
  richtingId: string;
  hasOnderdelen: boolean;
}

const VakCard = ({ id, name, description, year, richtingId, hasOnderdelen }: VakCardProps) => {
  return (
    <Link to={`/jaar/${year}/${richtingId}/${id}`}>
      <Card className="group transition-all hover:shadow-lg hover:border-primary h-full">
        <CardHeader>
          <div className="mb-2 inline-block rounded-lg bg-primary/10 p-2">
            {hasOnderdelen ? (
              <Layers className="h-5 w-5 text-primary" />
            ) : (
              <Book className="h-5 w-5 text-primary" />
            )}
          </div>
          <CardTitle className="flex items-center justify-between">
            {name}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {hasOnderdelen ? "Bevat meerdere onderdelen" : "Bekijk oefeningen"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VakCard;
