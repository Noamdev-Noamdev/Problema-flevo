import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import MathRenderer from "@/components/MathRenderer";
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
  const [connections, setConnections] = useState<{ [key: number]: { [left: string]: string } }>({});
  const [selectedLeft, setSelectedLeft] = useState<{ [key: number]: string | null }>({});

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

  const selectLeftItem = (questionNumber: number, item: string) => {
    setSelectedLeft(prev => ({
      ...prev,
      [questionNumber]: item
    }));
  };

  const connectItems = (questionNumber: number, rightItem: string) => {
    const left = selectedLeft[questionNumber];
    if (!left) return;

    setConnections(prev => ({
      ...prev,
      [questionNumber]: {
        ...(prev[questionNumber] || {}),
        [left]: rightItem
      }
    }));

    setSelectedLeft(prev => ({
      ...prev,
      [questionNumber]: null
    }));
  };

  const removeConnection = (questionNumber: number, leftItem: string) => {
    setConnections(prev => {
      const newConnections = { ...(prev[questionNumber] || {}) };
      delete newConnections[leftItem];
      return {
        ...prev,
        [questionNumber]: newConnections
      };
    });
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
                  <div className="space-y-4">
                    {!showSolutions[vraag.vraag_nummer] && (
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                        <p className="text-sm font-medium">
                          {selectedLeft[vraag.vraag_nummer] 
                            ? '✓ Klik nu op een item rechts om de verbinding te maken' 
                            : '① Klik eerst op een item links'}
                        </p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
                      {/* Linker kolom */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Linker items</h4>
                        {(vraag as VerbindingVraag).links_items.map((item, index) => {
                          const isSelected = selectedLeft[vraag.vraag_nummer] === item;
                          const connection = connections[vraag.vraag_nummer]?.[item];
                          return (
                            <div key={index} className="relative">
                              <button
                                onClick={() => {
                                  if (!showSolutions[vraag.vraag_nummer]) {
                                    if (connection) {
                                      removeConnection(vraag.vraag_nummer, item);
                                    } else {
                                      selectLeftItem(vraag.vraag_nummer, item);
                                    }
                                  }
                                }}
                                disabled={showSolutions[vraag.vraag_nummer]}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                  isSelected
                                    ? 'bg-primary/20 border-primary shadow-lg scale-105'
                                    : connection
                                    ? 'bg-green-500/10 border-green-500'
                                    : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                                } ${showSolutions[vraag.vraag_nummer] ? 'cursor-default' : 'cursor-pointer'}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </span>
                                  <MathRenderer content={item} className="flex-1" />
                                </div>
                              </button>
                              {connection && !showSolutions[vraag.vraag_nummer] && (
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                                  <div className="bg-green-500 text-white rounded-full p-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Middenlijn */}
                      <div className="hidden md:flex flex-col items-center justify-center h-full min-h-[200px]">
                        <div className="w-0.5 h-full bg-border"></div>
                      </div>

                      {/* Rechter kolom */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Rechter items</h4>
                        {(vraag as VerbindingVraag).rechts_items.map((item, index) => {
                          const isConnected = Object.values(connections[vraag.vraag_nummer] || {}).includes(item);
                          const canConnect = selectedLeft[vraag.vraag_nummer] && !showSolutions[vraag.vraag_nummer];
                          return (
                            <button
                              key={index}
                              onClick={() => canConnect && connectItems(vraag.vraag_nummer, item)}
                              disabled={!canConnect}
                              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                canConnect
                                  ? 'bg-card border-border hover:border-primary hover:shadow-md cursor-pointer hover:scale-105'
                                  : isConnected
                                  ? 'bg-green-500/10 border-green-500 cursor-default'
                                  : 'bg-card border-border cursor-not-allowed opacity-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold">
                                  {String.fromCharCode(65 + index)}
                                </span>
                                <MathRenderer content={item} className="flex-1" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gemaakte verbindingen tonen */}
                    {!showSolutions[vraag.vraag_nummer] && Object.keys(connections[vraag.vraag_nummer] || {}).length > 0 && (
                      <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                        <h4 className="font-semibold text-sm mb-3">Jouw verbindingen:</h4>
                        <div className="space-y-2">
                          {Object.entries(connections[vraag.vraag_nummer] || {}).map(([left, right], index) => (
                            <div key={index} className="flex items-center gap-3 text-sm bg-card p-2 rounded">
                              <MathRenderer content={left} className="flex-1" />
                              <span className="text-green-500 font-bold">→</span>
                              <MathRenderer content={right} className="flex-1" />
                              <button
                                onClick={() => removeConnection(vraag.vraag_nummer, left)}
                                className="text-destructive hover:underline text-xs px-2 py-1 rounded hover:bg-destructive/10"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
