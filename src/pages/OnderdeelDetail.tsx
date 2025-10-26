import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import ExerciseCard from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichting } from "@/data/richtingen";
import { getVak } from "@/data/vakken";
import { getOnderdeel } from "@/data/onderdelen";
import { loadOefeningen, Oefening } from "@/lib/exerciseLoader";

const OnderdeelDetail = () => {
  const { year, richting, vak, onderdeel } = useParams<{ 
    year: string; 
    richting: string; 
    vak: string;
    onderdeel: string;
  }>();
  
  const yearNumber = parseInt(year || "1");
  const richtingData = getRichting(yearNumber, richting || "");
  const vakData = getVak(richting || "", vak || "");
  const onderdeelData = getOnderdeel(yearNumber, vak || "", onderdeel || "");
  const [oefeningen, setOefeningen] = useState<Oefening[]>([]);
  const [loading, setLoading] = useState(true);

  if (!richtingData || !vakData || !onderdeelData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Onderdeel niet gevonden</p>
          <Button asChild className="mt-4">
            <Link to="/">Terug naar overzicht</Link>
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const loadExercises = async () => {
      if (year && richting && vak && onderdeel) {
        const data = await loadOefeningen(yearNumber, richting, vak, onderdeel);
        if (data) {
          setOefeningen(data.oefeningen);
        }
      }
      setLoading(false);
    };
    
    loadExercises();
  }, [year, richting, vak, onderdeel, yearNumber]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to={`/jaar/${year}/${richting}/${vak}`}>
              <ChevronLeft className="h-4 w-4" />
              Terug naar {vakData.name}
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {vakData.name} • {richtingData.name} • {yearNumber === 1 ? "1ste" : yearNumber === 2 ? "2de" : yearNumber === 3 ? "3de" : `${yearNumber}de`} jaar
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {onderdeelData.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {onderdeelData.description}
          </p>
        </div>

        {/* Exercises */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Beschikbare Oefeningen
          </h2>
          {loading ? (
            <p>Oefeningen laden...</p>
          ) : oefeningen.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {oefeningen.map((oefening) => (
                <ExerciseCard
                  key={oefening.id}
                  id={oefening.id}
                  title={oefening.titel}
                  description={oefening.beschrijving}
                  category={oefening.categorie}
                  difficulty={oefening.moeilijkheidsgraad}
                  points={oefening.totaal_punten}
                  estimatedTime={oefening.geschatte_tijd}
                  isPremium={oefening.type === "premium"}
                  year={yearNumber}
                  richtingId={richting || ""}
                  vakId={vak || ""}
                  onderdeelId={onderdeel}
                  questionsCount={oefening.vragen.length}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-muted bg-muted/30 p-6 text-center">
              <p className="text-muted-foreground">
                Geen oefeningen gevonden. Voeg oefeningen toe via de JSON template in de exercises map.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default OnderdeelDetail;
