#!/usr/bin/env python3
"""
Moteur de textométrie comparative pour l'analyse du discours politique.
- Spécificités lexicales (modèle hypergéométrique de Lafon, 1980) : mots sur/sous-employés
  par un corpus (parti) par rapport à l'ensemble du corpus global.
- Indicateurs d'analyse critique : populisme (nous/eux), modalité déontique, dramatisation.
- Richesse lexicale, cooccurrences.
Entrée attendue : /home/user/workspace/corpus_partis.json = {"CAQ": "texte...", "PQ": "...", ...}
plus le corpus Climat Québec déjà nettoyé.
"""
import json, re, math, collections
from scipy.stats import hypergeom

STOP = set("""au aux avec ce ces dans de des du elle en et eux il je la le leur lui ma mais me même
mes moi mon ne nos notre nous on ou où par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une
vos votre vous c d j l à m n s t y été étée étées étés étant suis es est sommes êtes sont serai seras sera serons
serez seront serais serait serions seriez seraient étais était étions étiez étaient fus fut fûmes fûtes furent sois
soit soyons soyez soient fusse fusses fût fussions fussiez fussent ayant eu eue eues eus ai as avons avez ont aurai
auras aura aurons aurez auront aurais aurait aurions auriez auraient avais avait avions aviez avaient eut eûmes eûtes
eurent aie aies ait ayons ayez aient eusse eusses eût eussions eussiez eussent ceci cela celà cet cette ici ils les
leurs quel quels quelle quelles sans soi plus fait faire cela comme aussi entre très tout tous toute toutes déjà donc
alors être avoir cette leur si non oui a puis lors dont chaque tandis afin lorsque quand car ni son ainsi selon
depuis vers chez sous sera était été plusieurs certains celui-ci celle-ci ce-qui c-est n-est qu-il qu-elle d-un d-une
l-a l-ont j-ai n-a cet doit peut faut ceux celles-ci notamment nombre grande grand grands grandes bien peu ça cela
autre autres fois encore temps ans an après avant pendant contre là aussi trop moins autant tel telle""".split())

def tokens(txt):
    txt = txt.lower().replace("’","'").replace("œ","oe")
    words = re.findall(r"[a-zàâäéèêëïîôöùûüçœ]+(?:-[a-zàâäéèêëïîôöùûüçœ]+)*", txt)
    out = []
    for w in words:
        for pre in ("l'","d'","j'","n'","s'","c'","m'","t'","qu'"):
            if w.startswith(pre): w = w[len(pre):]
        if len(w) <= 2 or w in STOP: continue
        out.append(w)
    return out

def specificites(sub_counts, sub_total, glob_counts, glob_total, seuil=2.0, min_freq=4):
    """
    Modèle hypergéométrique de Lafon : pour chaque mot, probabilité d'observer
    sa fréquence dans le sous-corpus si le tirage était aléatoire dans le corpus global.
    Renvoie un score de spécificité = -log10(p) signé (+ = sur-emploi, - = sous-emploi).
    """
    specs = {}
    for mot, f_sub in sub_counts.items():
        if f_sub < min_freq: continue
        F = glob_counts.get(mot, 0)   # fréquence totale dans le corpus global
        if F == 0: continue
        # hypergeom : population=glob_total, succès=F, tirage=sub_total
        # P(X >= f_sub) pour sur-emploi, P(X <= f_sub) pour sous-emploi
        esperance = F * sub_total / glob_total
        if f_sub >= esperance:
            p = hypergeom.sf(f_sub - 1, glob_total, F, sub_total)  # survie = P(X>=f_sub)
            signe = 1
        else:
            p = hypergeom.cdf(f_sub, glob_total, F, sub_total)     # P(X<=f_sub)
            signe = -1
        if p <= 0: p = 1e-300
        score = signe * (-math.log10(p))
        if abs(score) >= seuil:
            specs[mot] = round(score, 2)
    return dict(sorted(specs.items(), key=lambda x: -x[1]))

def indic_critique(txt):
    """Indicateurs d'analyse du discours critique, normalisés pour 10 000 mots."""
    t = txt.lower().replace("’","'")
    n_mots = max(len(t.split()), 1)
    def c(patterns):
        return sum(len(re.findall(r"\b"+re.escape(p)+r"\b", t)) for p in patterns)
    nous = c(["nous","notre","nos"])
    eux = c(["ils","elles","eux","leur","leurs"]) + c(["gouvernement","legault","ottawa","multinationale","multinationales","lobby","élite","élites","establishment"])
    je = c(["je","moi","mon","ma","mes"])
    vous = c(["vous","votre","vos"])
    deontique = c(["doit","doivent","faut","devons","devrait","devraient"])
    proposition = c(["proposons","proposer","proposition","proposé","engageons","engagement","engagements","plan"])
    dramatisation = c(["crise","urgence","menace","danger","catastrophe","scandale","inacceptable","échec","déclin"])
    futur_positif = c(["avenir","espoir","fierté","prospérité","richesse","réussir","bâtir","construire","opportunité","gagner"])
    norm = lambda x: round(x / n_mots * 10000, 1)
    return {
        "n_mots": n_mots,
        "nous_10k": norm(nous), "eux_10k": norm(eux), "je_10k": norm(je), "vous_10k": norm(vous),
        "ratio_nous_eux": round(nous / max(eux,1), 2),
        "deontique_10k": norm(deontique), "proposition_10k": norm(proposition),
        "dramatisation_10k": norm(dramatisation), "futur_positif_10k": norm(futur_positif),
        "ratio_dramat_futur": round(dramatisation / max(futur_positif,1), 2),
    }

def richesse(toks):
    n = len(toks); v = len(set(toks))
    return {"tokens": n, "vocab": v, "ttr": round(v/max(n,1),4),
            "hapax_pct": round(sum(1 for _,f in collections.Counter(toks).items() if f==1)/max(v,1)*100,1)}

def main():
    corpus = json.load(open("/home/user/workspace/corpus_partis.json", encoding="utf-8"))
    # Ajouter Climat Québec depuis le corpus déjà nettoyé
    try:
        cq = json.load(open("/home/user/workspace/cq_corpus_clean.json", encoding="utf-8"))
        corpus["Climat Québec"] = " ".join(d["titre"]+" "+d["texte"] for d in cq)
    except Exception as e:
        print("CQ non chargé:", e)

    # Tokeniser chaque corpus
    toks_par_parti = {p: tokens(t) for p, t in corpus.items()}
    counts_par_parti = {p: collections.Counter(tk) for p, tk in toks_par_parti.items()}

    # Corpus global
    glob = collections.Counter()
    for c_ in counts_par_parti.values(): glob.update(c_)
    glob_total = sum(glob.values())

    result = {"partis": {}, "meta": {"glob_total_tokens": glob_total, "n_partis": len(corpus)}}
    for p in corpus:
        sub = counts_par_parti[p]
        sub_total = sum(sub.values())
        result["partis"][p] = {
            "richesse": richesse(toks_par_parti[p]),
            "indicateurs_critiques": indic_critique(corpus[p]),
            "specificites_positives": dict(list(specificites(sub, sub_total, glob, glob_total).items())[:30]),
            "top_mots": collections.Counter(sub).most_common(20),
        }
    json.dump(result, open("/home/user/workspace/textometrie_resultats.json","w",encoding="utf-8"),
              ensure_ascii=False, indent=1)

    # Affichage résumé
    for p, d in result["partis"].items():
        print(f"\n{'='*60}\n{p}  ({d['richesse']['tokens']} tokens signifiants)")
        ic = d["indicateurs_critiques"]
        print(f"  nous/eux={ic['ratio_nous_eux']} | dramat/futur={ic['ratio_dramat_futur']} | "
              f"déontique={ic['deontique_10k']}/10k | proposition={ic['proposition_10k']}/10k")
        specs = list(d["specificites_positives"].items())[:12]
        print("  Mots spécifiques (sur-employés):", ", ".join(f"{m}({s})" for m,s in specs))
    print("\nÉcrit: textometrie_resultats.json")

if __name__ == "__main__":
    main()
