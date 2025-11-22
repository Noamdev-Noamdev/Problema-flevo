import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import OnderdeelCard from "@/components/OnderdeelCard";
import ExerciseCard from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichting } from "@/data/richtingen";
import { getVak } from "@/data/vakken";
import { getOnderdelenForVak } from "@/data/onderdelen";
import { loadOefeningen, Oefening } from "@/lib/exerciseLoader";

const VakDetail = () => {
  const { year, richting, vak } = useParams<{ year: string; richting: string; vak: string }>();
  const yearNumber = parseInt(year || "1");
  const richtingData = getRichting(yearNumber, richting || "");
  const vakData = getVak(richting || "", vak || "");
  const [oefeningen, setOefeningen] = useState<Oefening[]>([]);
  const [loading, setLoading] = useState(true);

  if (!richtingData || !vakData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Vak niet gevonden</p>
          <Button asChild className="mt-4">
            <Link to="/">Terug naar overzicht</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check if this subject has onderdelen (wiskunde or latijn)
  const onderdelen = getOnderdelenForVak(yearNumber, vak || "");
  const hasOnderdelen = onderdelen.length > 0;

  useEffect(() => {
    const loadExercises = async () => {
      if (!hasOnderdelen && year && richting && vak) {
        const data = await loadOefeningen(yearNumber, richting, vak);
        if (data) {
          // Sorteer: gratis oefeningen eerst, dan premium
          const sortedOefeningen = [...data.oefeningen].sort((a, b) => {
            if (a.type === "gratis" && b.type === "premium") return -1;
            if (a.type === "premium" && b.type === "gratis") return 1;
            return 0;
          });
          setOefeningen(sortedOefeningen);
        }
      }
      setLoading(false);
    };
    
    loadExercises();
  }, [year, richting, vak, hasOnderdelen, yearNumber]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to={`/jaar/${year}/${richting}`}>
              <ChevronLeft className="h-4 w-4" />
              Terug naar vakken
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            {richtingData.name} • {yearNumber === 1 ? "1ste" : yearNumber === 2 ? "2de" : yearNumber === 3 ? "3de" : `${yearNumber}de`} jaar
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {vakData.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {vakData.description}
          </p>
        </div>

        {/* Show onderdelen for wiskunde/latijn, or exercises for other subjects */}
        {hasOnderdelen ? (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Kies een onderdeel
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {onderdelen.map((onderdeel) => (
                <OnderdeelCard
                  key={onderdeel.id}
                  id={onderdeel.id}
                  name={onderdeel.name}
                  description={onderdeel.description}
                  year={yearNumber}
                  richtingId={richting || ""}
                  vakId={vak || ""}
                />
              ))}
            </div>
          </section>
        ) : (
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
                  isPremium={oefening.type === "premium" && !localStorage.getItem("premium_access")}
                  year={yearNumber}
                  richtingId={richting || ""}
                  vakId={vak || ""}
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
        )}
      </div>
    </div>
  );
};

export default VakDetail;
