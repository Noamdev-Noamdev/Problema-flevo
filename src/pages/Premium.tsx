import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Check, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Premium = () => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  // Simple password check (temporary - will be replaced with real auth)
  const DEMO_PASSWORD = "premium2024";

  const handleUnlock = () => {
    if (password === DEMO_PASSWORD) {
      setIsUnlocked(true);
      toast({
        title: "Premium ontgrendeld! 🎉",
        description: "Je hebt nu toegang tot alle premium oefeningen.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Onjuist wachtwoord",
        description: "Probeer het opnieuw of neem contact op voor toegang.",
      });
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md">
            <Card className="border-premium">
              <CardHeader className="text-center">
                <div className="mb-4 inline-block rounded-full bg-premium/10 p-4">
                  <Crown className="h-12 w-12 text-premium" />
                </div>
                <CardTitle className="text-3xl">Premium Toegang</CardTitle>
                <CardDescription className="text-base">
                  Voer je wachtwoord in om toegang te krijgen tot premium oefeningen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Voer wachtwoord in"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  />
                </div>
                <Button 
                  onClick={handleUnlock}
                  className="w-full gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Ontgrendel Premium
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Demo wachtwoord: <code className="rounded bg-muted px-2 py-1">premium2024</code>
                </p>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Premium Voordelen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Toegang tot alle oefeningen",
                  "Uitgebreide uitwerkingen",
                  "Extra moeilijke vraagstukken",
                  "Examensimulaties",
                  "Persoonlijke voortgangsrapportage",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-success/10 p-1">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-success/10 p-4">
            <Crown className="h-12 w-12 text-success" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Welkom bij Premium! 🎉
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Je hebt nu toegang tot alle premium oefeningen. Ga naar een richting om te beginnen.
          </p>
          <Button asChild size="lg">
            <a href="/">Bekijk alle oefeningen</a>
          </Button>
        </div>

        {/* Premium content preview */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Premium Oefeningen Preview</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="mb-2 inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                  Wiskunde
                </div>
                <CardTitle>Gevorderde Integraalrekening</CardTitle>
                <CardDescription>
                  Complexe integralen en toepassingen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Start oefening
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                  Natuurkunde
                </div>
                <CardTitle>Elektrodynamica</CardTitle>
                <CardDescription>
                  Maxwell vergelijkingen en toepassingen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Start oefening
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
