// Data structure for Flemish school system

export interface Richting {
  id: string;
  name: string;
  fullName: string;
  year: number;
}

export const richtingenData: Record<number, Richting[]> = {
  6: [
    { id: "wewi", name: "WeWi", fullName: "Wetenschappen-Wiskunde", year: 6 },
    { id: "lwi", name: "LWi", fullName: "Latijn-Wiskunde", year: 6 },
    { id: "mtwe", name: "MtWe", fullName: "Moderne Talen-Wetenschappen", year: 6 },
    { id: "huwe", name: "HuWe", fullName: "Humane Wetenschappen", year: 6 },
    { id: "ecwi", name: "EcWi", fullName: "Economie-Wiskunde", year: 6 },
    { id: "spwe", name: "SpWe", fullName: "Sportwetenschappen", year: 6 },
    { id: "lawi", name: "LaWi", fullName: "Latijn-Wiskunde", year: 6 },
  ],
  5: [
    { id: "wewi", name: "WeWi", fullName: "Wetenschappen-Wiskunde", year: 5 },
    { id: "lwi", name: "LWi", fullName: "Latijn-Wiskunde", year: 5 },
    { id: "mtwe", name: "MtWe", fullName: "Moderne Talen-Wetenschappen", year: 5 },
    { id: "huwe", name: "HuWe", fullName: "Humane Wetenschappen", year: 5 },
    { id: "ecwi", name: "EcWi", fullName: "Economie-Wiskunde", year: 5 },
    { id: "spwe", name: "SpWe", fullName: "Sportwetenschappen", year: 5 },
  ],
  4: [
    { id: "wewi", name: "WeWi", fullName: "Wetenschappen-Wiskunde", year: 4 },
    { id: "lwi", name: "LWi", fullName: "Latijn-Wiskunde", year: 4 },
    { id: "mtwe", name: "MtWe", fullName: "Moderne Talen-Wetenschappen", year: 4 },
    { id: "huwe", name: "HuWe", fullName: "Humane Wetenschappen", year: 4 },
    { id: "ecwi", name: "EcWi", fullName: "Economie-Wiskunde", year: 4 },
  ],
  3: [
    { id: "astroom", name: "A-stroom", fullName: "Algemene vorming A", year: 3 },
    { id: "bstroom", name: "B-stroom", fullName: "Algemene vorming B", year: 3 },
  ],
  2: [
    { id: "astroom", name: "A-stroom", fullName: "Algemene vorming A", year: 2 },
    { id: "bstroom", name: "B-stroom", fullName: "Algemene vorming B", year: 2 },
  ],
  1: [
    { id: "astroom", name: "A-stroom", fullName: "Algemene vorming A", year: 1 },
    { id: "bstroom", name: "B-stroom", fullName: "Algemene vorming B", year: 1 },
  ],
};

export const getRichtingenForYear = (year: number): Richting[] => {
  return richtingenData[year] || [];
};

export const getRichting = (year: number, id: string): Richting | undefined => {
  return richtingenData[year]?.find((r) => r.id === id);
};
