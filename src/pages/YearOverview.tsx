import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import RichtingCard from "@/components/RichtingCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichtingenForYear } from "@/data/richtingen";

const YearOverview = () => {
  const { year } = useParams<{ year: string }>();
  const yearNumber = parseInt(year || "1");
  const richtingen = getRichtingenForYear(yearNumber);

  const yearName = yearNumber === 1 ? "1ste" : yearNumber === 2 ? "2de" : yearNumber === 3 ? "3de" : `${yearNumber}de`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
              Terug naar overzicht
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {yearName} jaar
          </h1>
          <p className="text-lg text-muted-foreground">
            Kies je richting om beschikbare oefeningen te bekijken
          </p>
        </div>

        {/* Richtingen Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {richtingen.map((richting) => (
            <RichtingCard
              key={richting.id}
              id={richting.id}
              name={richting.name}
              fullName={richting.fullName}
              year={yearNumber}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearOverview;
