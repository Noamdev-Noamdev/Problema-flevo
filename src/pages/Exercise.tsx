import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import MathRenderer from "@/components/MathRenderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Eye, EyeOff, Clock, Target } from "lucide-react";
import { loadOefeningen, Oefening } from "@/lib/exerciseLoader";
import { toast } from "sonner";

const Exercise = () => {
  const { year, richting, vak, onderdeel, exerciseId } = useParams();
  const navigate = useNavigate();
  const [oefening, setOefening] = useState<Oefening | null>(null);
  const [showSolutions, setShowSolutions] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercise = async () => {
      if (!year || !richting || !vak || !exerciseId) return;

      const data = await loadOefeningen(
        parseInt(year),
        richting,
        vak,
        onderdeel
      );

      if (data) {
        const exercise = data.oefeningen.find(o => o.id === exerciseId);
        if (exercise) {
          setOefening(exercise);
        } else {
          toast.error("Oefening niet gevonden");
          navigate(-1);
        }
      } else {
        toast.error("Geen oefeningen beschikbaar");
        navigate(-1);
      }
      setLoading(false);
    };

    loadExercise();
  }, [year, richting, vak, onderdeel, exerciseId, navigate]);

  const toggleSolution = (questionNumber: number) => {
    setShowSolutions(prev => ({
      ...prev,
      [questionNumber]: !prev[questionNumber]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Laden...</p>
        </div>
      </div>
    );
  }

  if (!oefening) {
    return null;
  }

  const backUrl = onderdeel 
    ? `/jaar/${year}/${richting}/${vak}/${onderdeel}`
    : `/jaar/${year}/${richting}/${vak}`;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="gap-2">
            <Link to={backUrl}>
              <ChevronLeft className="h-4 w-4" />
              Terug naar overzicht
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block rounded-md bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              {oefening.categorie}
            </span>
            <span className="inline-block rounded-md bg-secondary/20 px-3 py-1 text-sm font-medium">
              {oefening.moeilijkheidsgraad}
            </span>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {oefening.titel}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {oefening.beschrijving}
          </p>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {oefening.geschatte_tijd}
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {oefening.totaal_punten} punten
            </div>
          </div>
        </div>

        {oefening.tips && oefening.tips.length > 0 && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {oefening.tips.map((tip, index) => (
                  <li key={index} className="text-sm">{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {oefening.vragen.map((vraag) => (
            <Card key={vraag.vraag_nummer}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Vraag {vraag.vraag_nummer} ({vraag.punten} {vraag.punten === 1 ? 'punt' : 'punten'})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MathRenderer 
                  content={vraag.vraag} 
                  className="text-foreground"
                />

                <Button
                  variant="outline"
                  onClick={() => toggleSolution(vraag.vraag_nummer)}
                  className="gap-2"
                >
                  {showSolutions[vraag.vraag_nummer] ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Verberg oplossing
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Toon oplossing
                    </>
                  )}
                </Button>

                {showSolutions[vraag.vraag_nummer] && (
                  <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-muted">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Antwoord:</h4>
                      <MathRenderer 
                        content={vraag.antwoord}
                        className="text-foreground"
                      />
                    </div>

                    {vraag.stappen && vraag.stappen.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Stappen:</h4>
                        <ol className="list-decimal list-inside space-y-2">
                          {vraag.stappen.map((stap, index) => (
                            <li key={index}>
                              <MathRenderer 
                                content={stap}
                                className="inline text-foreground"
                              />
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Uitleg:</h4>
                      <MathRenderer 
                        content={vraag.uitleg}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {oefening.leerdoelen && oefening.leerdoelen.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Leerdoelen</CardTitle>
              <CardDescription>
                Wat je leert met deze oefening
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {oefening.leerdoelen.map((doel, index) => (
                  <li key={index}>{doel}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Exercise;
