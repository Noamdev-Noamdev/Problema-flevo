import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ExerciseCard from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getRichting } from "@/data/richtingen";

const RichtingDetail = () => {
  const { year, richting } = useParams<{ year: string; richting: string }>();
  const yearNumber = parseInt(year || "1");
  const richtingData = getRichting(yearNumber, richting || "");

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

  // Sample exercises (will be replaced with real data later)
  const freeExercises = [
    {
      title: "Basisoefeningen Wiskunde",
      description: "Oefen met algebra en functies",
      category: "Wiskunde",
    },
    {
      title: "Natuurkunde - Mechanica",
      description: "Krachten en beweging begrijpen",
      category: "Natuurkunde",
    },
    {
      title: "Chemie - Periodiek Systeem",
      description: "Leer de elementen kennen",
      category: "Chemie",
    },
    {
      title: "Biologie - Cellen",
      description: "Celstructuur en functie",
      category: "Biologie",
    },
  ];

  const premiumExercises = [
    {
      title: "Gevorderde Differentiaalvergelijkingen",
      description: "Voor wie extra uitdaging zoekt",
      category: "Wiskunde",
    },
    {
      title: "Kwantummechanica Introductie",
      description: "Verdieping in moderne natuurkunde",
      category: "Natuurkunde",
    },
  ];

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
            Kies een oefening om te starten
          </p>
        </div>

        {/* Free Exercises */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Gratis Oefeningen
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {freeExercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                title={exercise.title}
                description={exercise.description}
                category={exercise.category}
              />
            ))}
          </div>
        </section>

        {/* Premium Teaser */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Premium Oefeningen
            </h2>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/premium">
                Ontgrendel Premium
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {premiumExercises.map((exercise, index) => (
              <ExerciseCard
                key={index}
                title={exercise.title}
                description={exercise.description}
                category={exercise.category}
                isPremium
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RichtingDetail;
