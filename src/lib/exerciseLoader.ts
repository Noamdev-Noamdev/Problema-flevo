export interface VraagBase {
  vraag_nummer: number;
  vraag: string;
  uitleg?: string;
  punten: number;
  type: "open" | "meerkeuze" | "verbinding";
}

export interface OpenVraag extends VraagBase {
  type: "open";
  antwoord: string;
  stappen?: string[];
}

export interface MeerkeuzeVraag extends VraagBase {
  type: "meerkeuze";
  opties: string[];
  correct_antwoord: number; // index van correcte optie (0-based)
  uitleg_per_optie?: string[];
}

export interface VerbindingsItem {
  links: string;
  rechts: string;
}

export interface VerbindingVraag extends VraagBase {
  type: "verbinding";
  links_items: string[];
  rechts_items: string[];
  correcte_verbindingen: VerbindingsItem[];
}

export type Vraag = OpenVraag | MeerkeuzeVraag | VerbindingVraag;

export interface Oefening {
  id: string;
  titel: string;
  beschrijving: string;
  moeilijkheidsgraad: string;
  categorie: string;
  type: "gratis" | "premium";
  vragen: Vraag[];
  totaal_punten: number;
  geschatte_tijd: string;
  leerdoelen: string[];
  tips: string[];
}

export interface OefeningenData {
  vak: string;
  onderdeel?: string;
  jaar: number;
  richting: string;
  oefeningen: Oefening[];
}

export async function loadOefeningen(
  year: number,
  richting: string,
  vak: string,
  onderdeel?: string
): Promise<OefeningenData | null> {
  try {
    let path = `/exercises/${year}/${richting}/${vak}`;
    if (onderdeel) {
      path += `/${onderdeel}`;
    }
    path += '/oefeningen.json';

    const response = await fetch(path);
    if (!response.ok) {
      console.log(`No exercises found at ${path}`);
      return null;
    }
    
    const data: OefeningenData = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading exercises:', error);
    return null;
  }
}
