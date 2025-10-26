// Data structure for subsections (onderdelen) within subjects
// Configured per year for each subject

export interface Onderdeel {
  id: string;
  name: string;
  description: string;
}

// Type definition for onderdelen configuration per year
type OnderdelenConfig = {
  [vakId: string]: {
    [year: number]: Onderdeel[];
  };
};

// Onderdelen configuration per year and subject
export const onderdelenConfig: OnderdelenConfig = {
  wiskunde: {
    1: [
      { id: "getallen", name: "Getallenleer", description: "Gehele getallen en breuken" },
      { id: "algebra", name: "Algebra", description: "Eenvoudige vergelijkingen" },
      { id: "meetkunde", name: "Meetkunde", description: "Vlakke meetkunde en vormen" },
      { id: "statistiek", name: "Statistiek", description: "Gemiddelden en grafieken" },
    ],
    2: [
      { id: "algebra", name: "Algebra", description: "Vergelijkingen en stelsels" },
      { id: "functies", name: "Functies", description: "Lineaire functies" },
      { id: "meetkunde", name: "Meetkunde", description: "Oppervlakten en hoeken" },
      { id: "statistiek", name: "Statistiek", description: "Kansrekening basis" },
    ],
    3: [
      { id: "algebra", name: "Algebra", description: "Vergelijkingen en ongelijkheden" },
      { id: "functies", name: "Functies", description: "Lineaire en kwadratische functies" },
      { id: "meetkunde", name: "Meetkunde", description: "Vlakke en ruimtemeetkunde" },
      { id: "goniometrie", name: "Goniometrie", description: "Hoeken en driehoeken" },
      { id: "statistiek", name: "Statistiek", description: "Kansrekening en statistiek" },
    ],
    4: [
      { id: "algebra", name: "Algebra", description: "Complexe vergelijkingen" },
      { id: "functies", name: "Functies", description: "Exponentiële en logaritmische functies" },
      { id: "goniometrie", name: "Goniometrie", description: "Goniometrische vergelijkingen" },
      { id: "analyse", name: "Analyse", description: "Limieten en continuïteit" },
      { id: "statistiek", name: "Statistiek", description: "Kansverdelingen" },
      { id: "vectoren", name: "Vectoren", description: "Vectorrekening basis" },
    ],
    5: [
      { id: "functies", name: "Functies", description: "Transcendente functies" },
      { id: "analyse", name: "Analyse", description: "Afgeleiden en toepassingen" },
      { id: "integraalrekening", name: "Integraalrekening", description: "Primitieven en integralen" },
      { id: "statistiek", name: "Statistiek", description: "Inferentiële statistiek" },
      { id: "vectoren", name: "Vectoren", description: "Vectoren in de ruimte" },
    ],
    6: [
      { id: "analyse", name: "Analyse", description: "Afgeleiden en optimalisatie" },
      { id: "integraalrekening", name: "Integraalrekening", description: "Integralen en toepassingen" },
      { id: "statistiek", name: "Statistiek", description: "Statistiek en kansrekening" },
      { id: "vectoren", name: "Vectoren", description: "Vectorrekening gevorderd" },
    ],
  },
  latijn: {
    1: [
      { id: "grammatica", name: "Grammatica", description: "Basis naamvallen en vervoeging" },
      { id: "woordenschat", name: "Woordenschat", description: "Basiswoordenschat" },
      { id: "vertaling", name: "Vertaling", description: "Eenvoudige zinnen vertalen" },
    ],
    2: [
      { id: "grammatica", name: "Grammatica", description: "Naamvallen en werkwoorden" },
      { id: "woordenschat", name: "Woordenschat", description: "Uitgebreide woordenschat" },
      { id: "vertaling", name: "Vertaling", description: "Korte teksten vertalen" },
      { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis" },
    ],
    3: [
      { id: "grammatica", name: "Grammatica", description: "Naamvallen, werkwoorden en zinsbouw" },
      { id: "vertaling", name: "Vertaling", description: "Latijn naar Nederlands vertalen" },
      { id: "woordenschat", name: "Woordenschat", description: "Latijnse woorden en uitdrukkingen" },
      { id: "cultuur", name: "Cultuur", description: "Romeinse geschiedenis en cultuur" },
    ],
    4: [
      { id: "grammatica", name: "Grammatica", description: "Gevorderde grammatica" },
      { id: "vertaling", name: "Vertaling", description: "Complexe teksten vertalen" },
      { id: "literatuur", name: "Literatuur", description: "Klassieke Latijnse teksten" },
      { id: "cultuur", name: "Cultuur", description: "Romeinse beschaving" },
    ],
    5: [
      { id: "grammatica", name: "Grammatica", description: "Stijlfiguren en syntax" },
      { id: "vertaling", name: "Vertaling", description: "Literaire teksten vertalen" },
      { id: "literatuur", name: "Literatuur", description: "Romeinse literatuur en auteurs" },
      { id: "cultuur", name: "Cultuur", description: "Romeinse filosofie" },
    ],
    6: [
      { id: "grammatica", name: "Grammatica", description: "Gevorderde stilistische analyse" },
      { id: "vertaling", name: "Vertaling", description: "Complexe literaire teksten" },
      { id: "literatuur", name: "Literatuur", description: "Klassieke auteurs en werken" },
      { id: "cultuur", name: "Cultuur", description: "Romeinse cultuur en erfgoed" },
    ],
  },
};

export const getOnderdelenForVak = (year: number, vakId: string): Onderdeel[] => {
  if (!onderdelenConfig[vakId]) {
    return [];
  }
  return onderdelenConfig[vakId][year] || [];
};

export const getOnderdeel = (year: number, vakId: string, onderdeelId: string): Onderdeel | undefined => {
  const onderdelen = getOnderdelenForVak(year, vakId);
  return onderdelen.find((o) => o.id === onderdeelId);
};
