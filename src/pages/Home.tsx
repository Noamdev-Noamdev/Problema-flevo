import Navigation from "@/components/Navigation";
import YearCard from "@/components/YearCard";
import { BookOpen } from "lucide-react";

const Home = () => {
  const years = [
    { year: 6, description: "De laatste loodjes" },
    { year: 5, description: "Richting-specifieke oefeningen" },
    { year: 4, description: "Start van de tweede graad" },
    { year: 3, description: "Vervolg eerste graad" },
    { year: 2, description: "Tweede jaar eerste graad" },
    { year: 1, description: "Start secundair onderwijs" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-accent/20 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-full bg-primary/10 p-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
              Gratis Oefeningen voor Secundair Onderwijs
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Bereid je voor op examens met honderden online oefeningen, 
              speciaal ontwikkeld voor het Vlaamse onderwijssysteem.
            </p>
          </div>
        </div>
      </section>

      {/* Years Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Kies je jaar
            </h2>
            <p className="text-muted-foreground">
              Selecteer je schooljaar om de beschikbare richtingen te bekijken
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {years.map((item) => (
              <YearCard 
                key={item.year} 
                year={item.year} 
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Gratis Toegang</h3>
              <p className="text-muted-foreground">
                Honderden oefeningen zonder inloggen of betalen
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-secondary/10 p-3">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Officiële Leerstof</h3>
              <p className="text-muted-foreground">
                Gebaseerd op het Vlaamse leerplan
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-success/10 p-3">
                <BookOpen className="h-8 w-8 text-success" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Direct Oefenen</h3>
              <p className="text-muted-foreground">
                Begin meteen, geen registratie nodig
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
