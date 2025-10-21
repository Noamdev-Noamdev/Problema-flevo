import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import VakCard from "@/components/VakCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichting } from "@/data/richtingen";
import { getVakkenForRichting } from "@/data/vakken";

const RichtingDetail = () => {
  const { year, richting } = useParams<{ year: string; richting: string }>();
  const yearNumber = parseInt(year || "1");
  const richtingData = getRichting(yearNumber, richting || "");
  const vakken = getVakkenForRichting(richting || "");

  if (!richtingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Richting niet gevonden</p>
          <Button asChild className="mt-4">
            <Link to="/">Terug naar overzicht</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to={`/jaar/${year}`}>
              <ChevronLeft className="h-4 w-4" />
              Terug naar richtingen
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {yearNumber === 1 ? "1ste" : yearNumber === 2 ? "2de" : yearNumber === 3 ? "3de" : `${yearNumber}de`} jaar
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {richtingData.name} - {richtingData.fullName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Kies een vak om oefeningen te bekijken
          </p>
        </div>

        {/* Vakken Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Beschikbare Vakken
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vakken.map((vak) => (
              <VakCard
                key={vak.id}
                id={vak.id}
                name={vak.name}
                description={vak.description}
                year={yearNumber}
                richtingId={richting || ""}
                hasOnderdelen={vak.hasOnderdelen}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RichtingDetail;
