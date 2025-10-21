import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BookOpen } from "lucide-react";

interface RichtingCardProps {
  id: string;
  name: string;
  fullName: string;
  year: number;
}

const RichtingCard = ({ id, name, fullName, year }: RichtingCardProps) => {
  return (
    <Link to={`/jaar/${year}/${id}`}>
      <Card className="group transition-all hover:shadow-lg hover:border-primary h-full">
        <CardHeader>
          <div className="mb-2 inline-block rounded-lg bg-accent p-2">
            <BookOpen className="h-5 w-5 text-accent-foreground" />
          </div>
          <CardTitle className="flex items-center justify-between">
            {name}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </CardTitle>
          <CardDescription>{fullName}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Bekijk beschikbare oefeningen
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RichtingCard;
