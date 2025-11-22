// Utility functie om premium status te checken
// Deze functie valideert altijd opnieuw of de opgeslagen code nog geldig is

import { validatePremiumCode } from "./premiumCodes";

export const checkPremiumAccess = (): boolean => {
  const premiumAccess = localStorage.getItem("premium_access");
  const premiumCode = localStorage.getItem("premium_code");
  
  // Als er geen premium access is, return false
  if (premiumAccess !== "true" || !premiumCode) {
    return false;
  }
  
  // Valideer de opgeslagen code opnieuw
  const isValid = validatePremiumCode(premiumCode);
  
  // Als de code niet meer geldig is, verwijder premium access
  if (!isValid) {
    localStorage.removeItem("premium_access");
    localStorage.removeItem("premium_code");
    return false;
  }
  
  return true;
};
