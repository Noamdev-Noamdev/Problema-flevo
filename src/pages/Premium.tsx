import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Check, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validatePremiumCode } from "@/lib/premiumCodes";

const Premium = () => {
  const [code, setCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const YOUR_EMAIL = "jouwemail@example.com"; // Verander dit naar jouw email

  // Check bij laden of premium al actief is
  useEffect(() => {
    const premiumAccess = localStorage.getItem("premium_access");
    const premiumCode = localStorage.getItem("premium_code");
    
    if (premiumAccess === "true" && premiumCode) {
      // Valideer de opgeslagen code nog een keer
      if (validatePremiumCode(premiumCode)) {
        setIsUnlocked(true);
      } else {
        // Code is niet meer geldig, verwijder premium
        localStorage.removeItem("premium_access");
        localStorage.removeItem("premium_code");
      }
    }
  }, []);

  const handleUnlock = () => {
    const trimmedCode = code.trim();
    
    if (!trimmedCode) {
      toast({
        variant: "destructive",
        title: "Voer een code in",
        description: "Vul je toegangscode in om premium te activeren.",
      });
      return;
    }

    if (validatePremiumCode(trimmedCode)) {
      setIsUnlocked(true);
      localStorage.setItem("premium_access", "true");
      localStorage.setItem("premium_code", trimmedCode.toUpperCase());
      toast({
        title: "Premium geactiveerd! 🎉",
        description: "Je hebt nu toegang tot alle premium oefeningen.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ongeldige code",
        description: "Deze code is niet geldig of verlopen. Neem contact op voor een nieuwe code.",
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
                  Voer je toegangscode in om premium oefeningen te ontgrendelen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email instructie */}
                <div className="rounded-lg border border-muted bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Nog geen premium?</p>
                      <p className="text-sm text-muted-foreground">
                        Stuur een email naar{" "}
                        <a 
                          href={`mailto:${YOUR_EMAIL}`}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {YOUR_EMAIL}
                        </a>
                        {" "}voor betaling en ontvang je persoonlijke toegangscode.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code invoer */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Toegangscode</label>
                  <Input
                    type="text"
                    placeholder="Bijv: PROBLEMA-2024-ABC123"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    className="font-mono"
                  />
                </div>
                <Button 
                  onClick={handleUnlock}
                  className="w-full gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Activeer Premium
                </Button>
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
