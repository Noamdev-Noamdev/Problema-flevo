# Premium Toegangssysteem - Instructies

## Hoe het systeem werkt

Klanten kunnen premium toegang krijgen door:
1. Een email te sturen naar jouw emailadres voor betaling
2. Na betaling ontvangen ze een unieke toegangscode
3. Ze voeren deze code in op de Premium pagina
4. De code wordt opgeslagen in hun browser (localStorage) en blijft actief

## Nieuwe klant toevoegen

### Stap 1: Genereer een unieke code
Je kunt handmatig een code maken of deze generator gebruiken:
- Formaat: `PROBLEMA-2024-ABC123`
- Of open de browser console en typ: `generatePremiumCode()`

### Stap 2: Voeg de code toe aan het systeem
1. Open het bestand: `src/lib/premiumCodes.ts`
2. Voeg een nieuwe code toe aan de `VALID_PREMIUM_CODES` array:

```typescript
{
  code: "PROBLEMA-2024-XYZ789",
  expiryDate: "2025-12-31", // Optioneel: vervaldatum
  customerNote: "Jan Jansen - betaald op 21-11-2024" // Optioneel: voor jouw administratie
}
```

### Stap 3: Stuur de code naar de klant
Email de code naar de klant met instructies om deze in te voeren op de Premium pagina.

## Code intrekken

Om een code te deactiveren:
1. Open `src/lib/premiumCodes.ts`
2. Verwijder de code uit de `VALID_PREMIUM_CODES` array
3. OF voeg een vervaldatum toe die al voorbij is

## Voorbeeld configuratie

```typescript
export const VALID_PREMIUM_CODES: PremiumCode[] = [
  {
    code: "PROBLEMA-2024-ABC123",
    customerNote: "Demo code"
  },
  {
    code: "PROBLEMA-2024-XYZ789",
    expiryDate: "2025-06-30",
    customerNote: "Marie Pieters - 6 maanden toegang"
  },
  {
    code: "PROBLEMA-2024-DEF456",
    customerNote: "School groepslicentie"
  },
];
```

## Tips

- **Codes zijn hoofdletterongevoelig**: Klanten kunnen PROBLEMA-2024-ABC123 of problema-2024-abc123 invoeren
- **LocalStorage**: Premium toegang blijft actief in de browser van de klant totdat ze hun browserdata wissen
- **Geen account nodig**: Het systeem werkt zonder login of registratie
- **Privacy**: Codes worden alleen lokaal opgeslagen in de browser van de klant
- **Automatische validatie**: Elke keer dat een gebruiker de Premium pagina bezoekt, wordt hun code opnieuw gevalideerd. Als je een code uit de lijst verwijdert, verliezen ALLE gebruikers die die code hebben gebruikt automatisch hun premium toegang
- **Oefeningen sortering**: Gratis oefeningen worden altijd eerst getoond, premium oefeningen daarna

## Later upgraden naar accounts

Dit systeem is tijdelijk. Wanneer je klaar bent, kan je upgraden naar:
- Lovable Cloud met authentication
- Volledige database met gebruikersaccounts
- Betaling via Stripe integratie
- Automatische email met toegangscodes

## Belangrijke waarschuwing

⚠️ **Let op**: Iedereen die toegang heeft tot de code kan premium activeren. Deel codes alleen met betalende klanten en verander codes als ze gelekt zijn.
