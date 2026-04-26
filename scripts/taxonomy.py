"""Mirror of lib/taxonomy.ts — the single source of truth for the 6×~4 tree.

If you change one, change the other. (We could codegen one from the other, but
the file is small enough to keep in sync by eye.)
"""

TAXONOMY = {
    "ressentir-liberer": {
        "label": "Ressentir / libérer",
        "subs": ["tristesse", "solitude", "nostalgie", "manque"],
    },
    "aimer-vibrer": {
        "label": "Aimer / vibrer",
        "subs": ["amour", "passion", "attachement", "attirance-complexe"],
    },
    "se-reconstruire": {
        "label": "Se reconstruire / espérer",
        "subs": ["espoir", "resilience", "renouveau", "sens-inspiration"],
    },
    "sevader": {
        "label": "S'évader / se perdre",
        "subs": ["emerveillement", "curiosite", "aventure", "imaginaire"],
    },
    "ressentir-intensement": {
        "label": "Ressentir intensément",
        "subs": ["peur", "tension", "choc", "fascination", "suspense"],
    },
    "sapaiser": {
        "label": "S'apaiser / ralentir",
        "subs": ["serenite", "douceur", "reconfort", "legerete"],
    },
}

INTENSITIES = ("doux", "modéré", "bouleversant")
EFFECTS = ("apaisant", "cathartique", "inspirant", "déstabilisant")
