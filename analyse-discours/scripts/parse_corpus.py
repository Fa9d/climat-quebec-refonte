#!/usr/bin/env python3
"""Découpe corpus_partis_brut.md en {parti: texte_verbatim} pour la textométrie.
On ne garde que le discours réel : on retire les liens markdown, les URLs,
les en-têtes de section, et les annotations méta (Source:, contexte de l'agent)."""
import re, json

raw = open("/home/user/workspace/corpus_partis_brut.md", encoding="utf-8").read()

# Découper par parti sur les en-têtes "== NOM (SIGLE) =="
parts = re.split(r"^##\s*==\s*(.+?)\s*==\s*$", raw, flags=re.M)
# parts[0] = préambule ; ensuite alternance titre, contenu
mapping = {
    "COALITION AVENIR QUÉBEC (CAQ)": "CAQ",
    "PARTI QUÉBÉCOIS (PQ)": "PQ",
    "PARTI LIBÉRAL DU QUÉBEC (PLQ)": "PLQ",
    "QUÉBEC SOLIDAIRE (QS)": "QS",
    "PARTI CONSERVATEUR DU QUÉBEC (PCQ)": "PCQ",
}

def nettoyer(texte):
    lignes = []
    for ln in texte.split("\n"):
        s = ln.strip()
        if not s: continue
        if s.startswith("#"): continue                 # sous-titres de section
        if s.startswith("*Source") or s.startswith("Source"): continue
        if re.match(r"^\*?\(?Source", s): continue
        # retirer les liens markdown [texte](url) -> texte
        s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
        # retirer URLs nues
        s = re.sub(r"https?://\S+", " ", s)
        # retirer les puces / numérotation
        s = re.sub(r"^[\-\*\d\.\)]+\s*", "", s)
        # retirer annotations entre parenthèses de type (source ...), (juin 2026) gardées? on garde le texte
        # retirer les marqueurs gras/italique
        s = s.replace("**","").replace("*","").replace("`","")
        # retirer les mentions méta explicites de l'agent
        if re.match(r"^(Contexte|Note|Extrait|Citation|Slogan|Titre)\s*:", s, re.I):
            s = re.sub(r"^[^:]+:\s*", "", s)
        lignes.append(s)
    return " ".join(lignes)

corpus = {}
i = 1
while i < len(parts)-1:
    titre = parts[i].strip()
    contenu = parts[i+1]
    sigle = mapping.get(titre)
    if sigle:
        # couper avant la section "Sources principales consultées" si présente
        contenu = re.split(r"##\s*Sources principales", contenu)[0]
        corpus[sigle] = nettoyer(contenu)
    i += 2

json.dump(corpus, open("/home/user/workspace/corpus_partis.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
for p, t in corpus.items():
    print(f"{p}: {len(t.split())} mots")
print("Écrit: corpus_partis.json")
