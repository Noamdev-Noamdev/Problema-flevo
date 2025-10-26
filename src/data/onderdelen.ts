// Data structure for subsections (onderdelen) within subjects
// Only for Wiskunde and Latijn

export interface Onderdeel {
  id: string;
  name: string;
  description: string;
}

// Wiskunde onderdelen (general - can be customized per year)
export const wiskundeOnderdelen: Onderdeel[] = [
  { id: "analyse", name: "Analyse", description: "Trancendende functies en afgeleiden" },
  { id: "integraaltechnieken", name: "Integraaltechnieken", description: "Substitutie, partiële integratie, eneigenlijke integralen" },
  { id: "lineaire_algebra", name: "Lineaire Algebra", description: "Stelsels, eigenwaarden en eigenvectoren" },
  { id: "meetkunde", name: "Vlakke en Ruimtemeetkunde", description: "Analytische meetkunde in 2/3D" },
  { id: "kansrekening", name: "Kansrekening en Statistiek", description: "Combinarotiek, voorwaardelijke kans, verdelingen" },
  { id: "rijen", name: "Rijen en Reeksen", description: "Bestuderen van convergente en divergente rijen" },
  { id: "kegelsneden", name: "Kegelsneden", description: "Cirkel, parabool, elips en hyperbool" },
];

// Latijn onderdelen
export const latijnOnderdelen: Onderdeel[] = [
  { id: "grammatica", name: "Grammatica", description: "Naamvallen, werkwoorden en zinsbouw" },
  { id: "vertaling", name: "Vertaling", description: "Latijn naar Nederlands vertalen" },
  { id: "woordenschat", name: "Woordenschat", description: "Latijnse woorden en uitdrukkingen" },
  { id: "literatuur", name: "Literatuur", description: "Klassieke Latijnse teksten" },
  { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis en cultuur" },
];

// Chemie onderdelen
//export const chemieOnderdelen: Onderdeel[] = [


export const getOnderdelenForVak = (vakId: string): Onderdeel[] => {
  switch (vakId) {
    case "wiskunde":
      return wiskundeOnderdelen;
    case "latijn":
      return latijnOnderdelen;
    default:
      return [];
  }
};

export const getOnderdeel = (vakId: string, onderdeelId: string): Onderdeel | undefined => {
  const onderdelen = getOnderdelenForVak(vakId);
  return onderdelen.find((o) => o.id === onderdeelId);
};
