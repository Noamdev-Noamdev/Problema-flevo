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

## Hoe oefeningen toevoegen?

1. Navigeer naar de juiste map (of maak deze aan)
2. Kopieer `template.json`
3. Hernoem naar `oefeningen.json`
4. Vul je oefeningen in volgens het template formaat
5. De website zal automatisch de nieuwe oefeningen laden
