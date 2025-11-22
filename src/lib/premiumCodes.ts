// Premium toegangscodes systeem
// Voeg hier nieuwe codes toe voor elke klant

interface PremiumCode {
  code: string;
  expiryDate?: string; // Optioneel: YYYY-MM-DD formaat
  customerNote?: string; // Optioneel: notitie voor jezelf
}

// Lijst van geldige premium codes
// Voeg nieuwe codes toe wanneer een klant betaalt
export const VALID_PREMIUM_CODES: PremiumCode[] = [
  {
    code: "DEMO-2024-ABC123",
   customerNote: "Demo code voor testing"
  },
  // Voeg hier nieuwe codes toe in dit formaat:
  // {
  //   code: "JOUW-CODE-HIER",
  //   expiryDate: "2025-12-31", // Optioneel
  //   customerNote: "Klant naam of notitie" // Optioneel
  // },
];

// Functie om te checken of een code geldig is
export const validatePremiumCode = (inputCode: string): boolean => {
  const normalizedInput = inputCode.trim().toUpperCase();
  
  return VALID_PREMIUM_CODES.some(({ code, expiryDate }) => {
    const normalizedCode = code.toUpperCase();
    
    // Check of code matcht
    if (normalizedCode !== normalizedInput) {
      return false;
    }
    
    // Check expiry date als die bestaat
    if (expiryDate) {
      const expiry = new Date(expiryDate);
      const today = new Date();
      if (today > expiry) {
        return false; // Code is verlopen
      }
    }
    
    return true;
  });
};

// Functie om een nieuwe random code te genereren (gebruik dit als inspiratie)
export const generatePremiumCode = (): string => {
  const prefix = "PROBLEMA";
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${year}-${random}`;
};
