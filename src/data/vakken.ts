// Data structure for subjects (vakken) per study field (richting)

export interface Vak {
  id: string;
  name: string;
  description: string;
  hasOnderdelen: boolean; // true for wiskunde and latijn
}

// Vakken per richting
export const vakkenData: Record<string, Vak[]> = {
  // WeWi vakken
  wewi: [
    { id: "wiskunde", name: "Wiskunde", description: "Algebra, analyse en meetkunde", hasOnderdelen: true },
    { id: "fysica", name: "Fysica", description: "Mechanica, elektriciteit en optica", hasOnderdelen: true },
    { id: "chemie", name: "Chemie", description: "Anorganische en organische chemie", hasOnderdelen: true },
    { id: "biologie", name: "Biologie", description: "Cel- en evolutiebiologie", hasOnderdelen: false },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: true },
  ],
  // LWi vakken
  lwi: [
    { id: "latijn", name: "Latijn", description: "Grammatica, vertaling en literatuur", hasOnderdelen: true },
    { id: "wiskunde", name: "Wiskunde", description: "Algebra, analyse en meetkunde", hasOnderdelen: true },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "geschiedenis", name: "Geschiedenis", description: "Wereldgeschiedenis", hasOnderdelen: false },
  ],
  // MtWe vakken
  mtwe: [
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "duits", name: "Duits", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "wiskunde", name: "Wiskunde", description: "Algebra en analyse", hasOnderdelen: true },
    { id: "fysica", name: "Fysica", description: "Natuurkunde", hasOnderdelen: false },
    { id: "chemie", name: "Chemie", description: "Scheikunde", hasOnderdelen: false },
  ],
  // HuWe vakken
  huwe: [
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "geschiedenis", name: "Geschiedenis", description: "Wereldgeschiedenis", hasOnderdelen: false },
    { id: "aardrijkskunde", name: "Aardrijkskunde", description: "Geografie en maatschappij", hasOnderdelen: false },
    { id: "wiskunde", name: "Wiskunde", description: "Toegepaste wiskunde", hasOnderdelen: true },
  ],
  // EcWi vakken
  ecwi: [
    { id: "wiskunde", name: "Wiskunde", description: "Algebra en analyse", hasOnderdelen: true },
    { id: "economie", name: "Economie", description: "Micro- en macro-economie", hasOnderdelen: false },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
  ],
  // SpWe vakken
  spwe: [
    { id: "lichamelijke-opvoeding", name: "Lichamelijke Opvoeding", description: "Sport en beweging", hasOnderdelen: false },
    { id: "biologie", name: "Biologie", description: "Menselijke biologie", hasOnderdelen: false },
    { id: "wiskunde", name: "Wiskunde", description: "Toegepaste wiskunde", hasOnderdelen: true },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
  ],
  // A-stroom en B-stroom (algemene vakken)
  astroom: [
    { id: "wiskunde", name: "Wiskunde", description: "Basiswiskunde", hasOnderdelen: true },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "geschiedenis", name: "Geschiedenis", description: "Geschiedenis", hasOnderdelen: false },
    { id: "aardrijkskunde", name: "Aardrijkskunde", description: "Geografie", hasOnderdelen: false },
    { id: "biologie", name: "Biologie", description: "Biologie", hasOnderdelen: false },
  ],
  bstroom: [
    { id: "wiskunde", name: "Wiskunde", description: "Basiswiskunde", hasOnderdelen: true },
    { id: "nederlands", name: "Nederlands", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "engels", name: "Engels", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "frans", name: "Frans", description: "Taal en literatuur", hasOnderdelen: false },
    { id: "wereldoriëntatie", name: "Wereldoriëntatie", description: "Maatschappij en cultuur", hasOnderdelen: false },
  ],
};

export const getVakkenForRichting = (richtingId: string): Vak[] => {
  return vakkenData[richtingId] || [];
};

export const getVak = (richtingId: string, vakId: string): Vak | undefined => {
  return vakkenData[richtingId]?.find((v) => v.id === vakId);
};
