import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import MathRenderer from "@/components/MathRenderer";
import ConnectionExercise from "@/components/ConnectionExercise";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Eye, EyeOff, Clock, Target } from "lucide-react";
import { loadOefeningen, Oefening, OpenVraag, MeerkeuzeVraag, VerbindingVraag } from "@/lib/exerciseLoader";
import { toast } from "sonner";

const Exercise = () => {
  const { year, richting, vak, onderdeel, exerciseId } = useParams();
  const navigate = useNavigate();
  const [oefening, setOefening] = useState<Oefening | null>(null);
  const [showSolutions, setShowSolutions] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

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

  const selectAnswer = (questionNumber: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionNumber]: answerIndex
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
                  <li key={index} className="text-sm">
                    <MathRenderer content={tip} className="inline" />
                  </li>
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

                {/* Vraag type specifieke content */}
                {vraag.type === "meerkeuze" && (
                  <div className="space-y-2">
                    {(vraag as MeerkeuzeVraag).opties.map((optie, index) => (
                      <button 
                        key={index}
                        onClick={() => selectAnswer(vraag.vraag_nummer, index)}
                        disabled={showSolutions[vraag.vraag_nummer]}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          showSolutions[vraag.vraag_nummer] && index === (vraag as MeerkeuzeVraag).correct_antwoord
                            ? 'bg-green-500/10 border-green-500/30'
                            : selectedAnswers[vraag.vraag_nummer] === index
                            ? 'bg-primary/10 border-primary'
                            : 'bg-muted/10 border-muted hover:bg-muted/20'
                        } ${showSolutions[vraag.vraag_nummer] ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-semibold min-w-[24px]">{String.fromCharCode(65 + index)}.</span>
                          <MathRenderer content={optie} className="flex-1" />
                        </div>
                        {showSolutions[vraag.vraag_nummer] && (vraag as MeerkeuzeVraag).uitleg_per_optie?.[index] && (
                          <MathRenderer 
                            content={(vraag as MeerkeuzeVraag).uitleg_per_optie![index]}
                            className="text-sm text-muted-foreground mt-2 ml-8"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {vraag.type === "verbinding" && (
                  <ConnectionExercise
                    questionNumber={vraag.vraag_nummer}
                    linksItems={(vraag as VerbindingVraag).links_items}
                    rechtsItems={(vraag as VerbindingVraag).rechts_items}
                    correcteVerbindingen={(vraag as VerbindingVraag).correcte_verbindingen}
                    showSolution={showSolutions[vraag.vraag_nummer]}
                  />
                )}

                {showSolutions[vraag.vraag_nummer] && (
                  <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-muted">
                    {vraag.type === "open" && (
                      <>
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Antwoord:</h4>
                          <MathRenderer 
                            content={(vraag as OpenVraag).antwoord}
                            className="text-foreground"
                          />
                        </div>

                        {(vraag as OpenVraag).stappen && (vraag as OpenVraag).stappen!.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Stappen:</h4>
                            <ol className="list-decimal list-inside space-y-2">
                              {(vraag as OpenVraag).stappen!.map((stap, index) => (
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
                      </>
                    )}

                    {vraag.type === "meerkeuze" && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Correct antwoord:</h4>
                        <div className="flex items-start gap-2">
                          <span className="font-semibold">{String.fromCharCode(65 + (vraag as MeerkeuzeVraag).correct_antwoord)}.</span>
                          <MathRenderer 
                            content={(vraag as MeerkeuzeVraag).opties[(vraag as MeerkeuzeVraag).correct_antwoord]}
                            className="text-foreground flex-1"
                          />
                        </div>
                      </div>
                    )}

                    {vraag.type === "verbinding" && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Correcte verbindingen:</h4>
                        <ul className="space-y-2">
                          {(vraag as VerbindingVraag).correcte_verbindingen.map((verbinding, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <MathRenderer content={verbinding.links} className="flex-1" />
                              <span>→</span>
                              <MathRenderer content={verbinding.rechts} className="flex-1" />
                            </li>
                          ))}
                        </ul>
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
