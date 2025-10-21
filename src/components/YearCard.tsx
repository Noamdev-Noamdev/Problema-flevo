import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface YearCardProps {
  year: number;
  description: string;
}

const YearCard = ({ year, description }: YearCardProps) => {
  return (
    <Link to={`/jaar/${year}`}>
      <Card className="group transition-all hover:shadow-lg hover:border-primary">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-2xl">
            {year === 1 ? "1ste" : year === 2 ? "2de" : year === 3 ? "3de" : `${year}de`} jaar
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            Klik om richtingen te bekijken
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default YearCard;
