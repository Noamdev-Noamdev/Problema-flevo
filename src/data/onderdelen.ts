// Data structure for subsections (onderdelen) within subjects
// Configured per year for each subject

export interface Onderdeel {
  id: string;
  name: string;
  description: string;
}

// Wiskunde onderdelen (general - can be customized per year)
export const wiskundeOnderdelen: Onderdeel[] = [
  { id: "algebra", name: "Algebra", description: "Vergelijkingen en ongelijkheden" },
  { id: "functies", name: "Functies", description: "Lineaire en kwadratische functies" },
  { id: "meetkunde", name: "Meetkunde", description: "Vlakke en ruimtemmeetkunde" },
  { id: "goniometrie", name: "Goniometrie", description: "Hoeken en driehoeken" },
  { id: "analyse", name: "Analyse", description: "Limieten en afgeleiden" },
  { id: "integraalrekening", name: "Integraalrekening", description: "Integralen en toepassingen" },
  { id: "statistiek", name: "Statistiek", description: "Kansrekening en statistiek" },
  { id: "vectoren", name: "Vectoren", description: "Vectorrekening" },
];

// Latijn onderdelen
export const latijnOnderdelen: Onderdeel[] = [
  { id: "grammatica", name: "Grammatica", description: "Naamvallen, werkwoorden en zinsbouw" },
  { id: "vertaling", name: "Vertaling", description: "Latijn naar Nederlands vertalen" },
  { id: "woordenschat", name: "Woordenschat", description: "Latijnse woorden en uitdrukkingen" },
  { id: "literatuur", name: "Literatuur", description: "Klassieke Latijnse teksten" },
  { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis en cultuur" },
];

export const getOnderdelenForVak = (vakId: string): Onderdeel[] => {
  switch (vakId) {
    case "wiskunde":
      return wiskundeOnderdelen;
    case "latijn":
      return latijnOnderdelen;
    default:
      return [];
  }
  return onderdelenConfig[vakId][year] || [];
};

export const getOnderdeel = (year: number, vakId: string, onderdeelId: string): Onderdeel | undefined => {
  const onderdelen = getOnderdelenForVak(year, vakId);
  return onderdelen.find((o) => o.id === onderdeelId);
};
