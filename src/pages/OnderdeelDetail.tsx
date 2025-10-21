import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ExerciseCard from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichting } from "@/data/richtingen";
import { getVak } from "@/data/vakken";
import { getOnderdeel } from "@/data/onderdelen";

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
  const onderdeelData = getOnderdeel(vak || "", onderdeel || "");

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

  // Sample exercises (placeholder - will be loaded from JSON later)
  const sampleExercises = [
    {
      title: `${onderdeelData.name} - Oefening 1`,
      description: "Basisoefeningen voor beginners",
      category: onderdeelData.name,
    },
    {
      title: `${onderdeelData.name} - Oefening 2`,
      description: "Gemiddelde moeilijkheidsgraad",
      category: onderdeelData.name,
    },
    {
      title: `${onderdeelData.name} - Oefening 3`,
      description: "Gevorderde oefeningen",
      category: onderdeelData.name,
    },
    {
      title: `${onderdeelData.name} - Oefening 4`,
      description: "Examenvoorbereiding",
      category: onderdeelData.name,
    },
  ];

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleExercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                title={exercise.title}
                description={exercise.description}
                category={exercise.category}
              />
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-muted bg-muted/30 p-6 text-center">
            <p className="text-muted-foreground">
              Meer oefeningen worden binnenkort toegevoegd. 
              Gebruik de JSON template om eigen oefeningen toe te voegen.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnderdeelDetail;
