// Data structure for subsections (onderdelen) within subjects
// Configured per year for each subject

export interface Onderdeel {
  id: string;
  name: string;
  description: string;
  jaar: number;
}

// Type definition for onderdelen configuration
type OnderdelenConfig = {
  [vakId: string]: Onderdeel[];
};

// Onderdelen configuration per subject with year parameter
export const onderdelenConfig: OnderdelenConfig = {
  wiskunde: [
    // Jaar 1
    { id: "getallen", name: "Getallenleer", description: "Gehele getallen en breuken", jaar: 1 },
    { id: "algebra", name: "Algebra", description: "Eenvoudige vergelijkingen", jaar: 1 },
    { id: "meetkunde", name: "Meetkunde", description: "Vlakke meetkunde en vormen", jaar: 1 },
    { id: "statistiek", name: "Statistiek", description: "Gemiddelden en grafieken", jaar: 1 },
    // Jaar 2
    { id: "algebra", name: "Algebra", description: "Vergelijkingen en stelsels", jaar: 2 },
    { id: "functies", name: "Functies", description: "Lineaire functies", jaar: 2 },
    { id: "meetkunde", name: "Meetkunde", description: "Oppervlakten en hoeken", jaar: 2 },
    { id: "statistiek", name: "Statistiek", description: "Kansrekening basis", jaar: 2 },
    // Jaar 3
    { id: "algebra", name: "Algebra", description: "Vergelijkingen en ongelijkheden", jaar: 3 },
    { id: "functies", name: "Functies", description: "Lineaire en kwadratische functies", jaar: 3 },
    { id: "meetkunde", name: "Meetkunde", description: "Vlakke en ruimtemeetkunde", jaar: 3 },
    { id: "goniometrie", name: "Goniometrie", description: "Hoeken en driehoeken", jaar: 3 },
    { id: "statistiek", name: "Statistiek", description: "Kansrekening en statistiek", jaar: 3 },
    // Jaar 4
    { id: "algebra", name: "Algebra", description: "Complexe vergelijkingen", jaar: 4 },
    { id: "functies", name: "Functies", description: "Exponentiële en logaritmische functies", jaar: 4 },
    { id: "goniometrie", name: "Goniometrie", description: "Goniometrische vergelijkingen", jaar: 4 },
    { id: "analyse", name: "Analyse", description: "Limieten en continuïteit", jaar: 4 },
    { id: "statistiek", name: "Statistiek", description: "Kansverdelingen", jaar: 4 },
    { id: "vectoren", name: "Vectoren", description: "Vectorrekening basis", jaar: 4 },
    // Jaar 5
    { id: "functies", name: "Functies", description: "Transcendente functies", jaar: 5 },
    { id: "analyse", name: "Analyse", description: "Afgeleiden en toepassingen", jaar: 5 },
<<<<<<< HEAD
    { id: "goniometrie", name: "Goniometrie", description: "De leer van de hoekengti", jaar: 5 },
=======
    { id: "integraalrekening", name: "Integraalrekening", description: "Primitieven en integralen", jaar: 5 },
>>>>>>> 475551770a42fa2bc7bd5279ecc5ab9d8f0a7b59
    { id: "statistiek", name: "Statistiek", description: "Inferentiële statistiek", jaar: 5 },
    { id: "vectoren", name: "Vectoren", description: "Vectoren in de ruimte", jaar: 5 },
    // Jaar 6
    { id: "analyse", name: "Analyse", description: "Afgeleiden en optimalisatie", jaar: 6 },
    { id: "integraalrekening", name: "Integraalrekening", description: "Integralen en toepassingen", jaar: 6 },
    { id: "statistiek", name: "Statistiek", description: "Statistiek en kansrekening", jaar: 6 },
    { id: "vectoren", name: "Vectoren", description: "Vectorrekening gevorderd", jaar: 6 },
  ],
  latijn: [
    // Jaar 1
    { id: "grammatica", name: "Grammatica", description: "Basis naamvallen en vervoeging", jaar: 1 },
    { id: "woordenschat", name: "Woordenschat", description: "Basiswoordenschat", jaar: 1 },
    { id: "vertaling", name: "Vertaling", description: "Eenvoudige zinnen vertalen", jaar: 1 },
    // Jaar 2
    { id: "grammatica", name: "Grammatica", description: "Naamvallen en werkwoorden", jaar: 2 },
    { id: "woordenschat", name: "Woordenschat", description: "Uitgebreide woordenschat", jaar: 2 },
    { id: "vertaling", name: "Vertaling", description: "Korte teksten vertalen", jaar: 2 },
    { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis", jaar: 2 },
    // Jaar 3
    { id: "grammatica", name: "Grammatica", description: "Naamvallen, werkwoorden en zinsbouw", jaar: 3 },
    { id: "vertaling", name: "Vertaling", description: "Latijn naar Nederlands vertalen", jaar: 3 },
    { id: "woordenschat", name: "Woordenschat", description: "Latijnse woorden en uitdrukkingen", jaar: 3 },
    { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis en cultuur", jaar: 3 },
    // Jaar 4
    { id: "grammatica", name: "Grammatica", description: "Gevorderde grammatica", jaar: 4 },
    { id: "vertaling", name: "Vertaling", description: "Complexe teksten vertalen", jaar: 4 },
    { id: "literatuur", name: "Literatuur", description: "Klassieke Latijnse teksten", jaar: 4 },
    { id: "cultuur", name: "Cultuur", description: "Romeinse beschaving", jaar: 4 },
    // Jaar 5
    { id: "grammatica", name: "Grammatica", description: "Stijlfiguren en syntax", jaar: 5 },
    { id: "vertaling", name: "Vertaling", description: "Literaire teksten vertalen", jaar: 5 },
    { id: "literatuur", name: "Literatuur", description: "Romeinse literatuur en auteurs", jaar: 5 },
    { id: "cultuur", name: "Cultuur", description: "Romeinse filosofie", jaar: 5 },
    // Jaar 6
    { id: "grammatica", name: "Grammatica", description: "Gevorderde stilistische analyse", jaar: 6 },
    { id: "vertaling", name: "Vertaling", description: "Complexe literaire teksten", jaar: 6 },
    { id: "literatuur", name: "Literatuur", description: "Klassieke auteurs en werken", jaar: 6 },
    { id: "cultuur", name: "Cultuur", description: "Romeinse cultuur en erfgoed", jaar: 6 },
  ],
};

export const getOnderdelenForVak = (year: number, vakId: string): Onderdeel[] => {
  if (!onderdelenConfig[vakId]) {
    return [];
  }
  return onderdelenConfig[vakId].filter(onderdeel => onderdeel.jaar === year);
};

export const getOnderdeel = (year: number, vakId: string, onderdeelId: string): Onderdeel | undefined => {
  if (!onderdelenConfig[vakId]) {
    return undefined;
  }
  return onderdelenConfig[vakId].find((o) => o.id === onderdeelId && o.jaar === year);
};
