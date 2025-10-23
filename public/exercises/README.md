# Oefeningen Template

Deze map bevat de JSON templates voor het toevoegen van oefeningen aan de website.

## Mapstructuur

Organiseer je oefeningen volgens deze structuur:

```
public/exercises/
├── README.md (dit bestand)
├── template.json (JSON template voorbeeld)
└── [jaar]/
    └── [richting]/
        └── [vak]/
            └── [onderdeel]/ (alleen voor wiskunde en latijn)
                └── oefeningen.json
```

## Voorbeelden

### Voor vakken zonder onderdelen
`public/exercises/6/wewi/fysica/oefeningen.json`

### Voor wiskunde en latijn (met onderdelen)
`public/exercises/6/wewi/wiskunde/algebra/oefeningen.json`
`public/exercises/6/lwi/latijn/grammatica/oefeningen.json`

## JSON Template

Zie `template.json` voor het exacte formaat van oefeningen.

### Vraag types

Er zijn 3 types vragen mogelijk:

1. **Open vragen** (`"type": "open"`):
   - Vragen waar de student een uitgewerkt antwoord moet geven
   - Bevat: `antwoord` en optioneel `stappen`

2. **Meerkeuze vragen** (`"type": "meerkeuze"`):
   - Vragen met voorgedefinieerde antwoordopties
   - Bevat: `opties` (array van strings), `correct_antwoord` (index 0-based)
   - Optioneel: `uitleg_per_optie` voor feedback per optie

3. **Verbindingsvragen** (`"type": "verbinding"`):
   - Vragen waar items aan elkaar gekoppeld moeten worden
   - Bevat: `links_items`, `rechts_items`, en `correcte_verbindingen`

## Wiskundige notatie

In de JSON bestanden kun je wiskundige formules schrijven met LaTeX syntax:
- Inline formules: `$x^2 + y^2 = z^2$`
- Display formules: `$$\sqrt{x} + \frac{a}{b}$$`

Voorbeelden:
- Wortels: `$\sqrt{16} = 4$` of `$\sqrt[3]{27} = 3$`
- Breuken: `$\frac{1}{2}$`
- Machten: `$x^2$` of `$2^{10}$`
- Haakjes: `$\left( \frac{a}{b} \right)^2$`
- Griekse letters: `$\alpha$`, `$\beta$`, `$\pi$`

## Hoe oefeningen toevoegen?

1. Navigeer naar de juiste map (of maak deze aan)
2. Kopieer `template.json`
3. Hernoem naar `oefeningen.json`
4. Vul je oefeningen in volgens het template formaat
5. De website zal automatisch de nieuwe oefeningen laden
