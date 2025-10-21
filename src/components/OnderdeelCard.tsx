import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FileText } from "lucide-react";

interface OnderdeelCardProps {
  id: string;
  name: string;
  description: string;
  year: number;
  richtingId: string;
  vakId: string;
}

const OnderdeelCard = ({ id, name, description, year, richtingId, vakId }: OnderdeelCardProps) => {
  return (
    <Link to={`/jaar/${year}/${richtingId}/${vakId}/${id}`}>
      <Card className="group transition-all hover:shadow-lg hover:border-secondary h-full">
        <CardHeader>
          <div className="mb-2 inline-block rounded-lg bg-secondary/10 p-2">
            <FileText className="h-5 w-5 text-secondary" />
          </div>
          <CardTitle className="flex items-center justify-between">
            {name}
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Bekijk oefeningen voor dit onderdeel
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OnderdeelCard;
