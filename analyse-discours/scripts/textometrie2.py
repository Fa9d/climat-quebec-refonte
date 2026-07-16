#!/usr/bin/env python3
"""Version affinée : filtre noms propres, mots calendaires et bruit journalistique
pour isoler le lexique IDÉOLOGIQUE spécifique de chaque parti. Ajoute l'analyse
par champs lexicaux comparés (radar) et les cooccurrences."""
import json, re, math, collections
from scipy.stats import hypergeom

STOP = set(open("/home/user/workspace/stopfr.txt").read().split()) if False else set("""au aux avec ce ces dans de des du elle en et eux il je la le leur lui ma mais me même
mes moi mon ne nos notre nous on ou où par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une
vos votre vous c d j l à m n s t y été étée étées étés étant suis es est sommes êtes sont serai seras sera serons
serez seront serais serait serions seriez seraient étais était étions étiez étaient furent sois soit soyons soyez
soient fût ayant eu eus ai as avons avez ont aura auront aurait avais avait avaient eut aie ait ceci cela cet cette
ici ils les leurs quel quels quelle quelles sans soi plus fait faire comme aussi entre très tout tous toute toutes
déjà donc alors être avoir si non oui puis lors dont chaque tandis afin lorsque quand car ni ainsi selon depuis vers
chez sous doit peut faut ceux notamment nombre grande grand bien peu ça autre autres fois encore temps ans an après
avant pendant contre là autant tel telle veut va vais allons dire dit dis fait faites font aujourd hui être cela""".split())

# Bruit à retirer : noms propres, mois, mots de méta-contexte journalistique
NOISE = set("""fréchette christine legault paul st-pierre plamondon charles milliard rodriguez ruba ghazal zanetti
éric duhaime martine ouellet gabriel nadeau-dubois drainville tanguay gentilcore paradis pascal catherine sol
janvier février mars avril mai juin juillet août septembre octobre novembre décembre lundi mardi mercredi jeudi
vendredi samedi dimanche session parlementaire congrès communiqué communiqués assermentation article discours
première deuxième année années semaine mois jour jours date bilan point points pdf lien source sources extrait
caq pq plq qs pcq solidaire conservateur libéral québécois parti partis quebec québec""".split())

def tokens(txt):
    txt = txt.lower().replace("’","'").replace("œ","oe")
    words = re.findall(r"[a-zàâäéèêëïîôöùûüçœ]+(?:-[a-zàâäéèêëïîôöùûüçœ]+)*", txt)
    out=[]
    for w in words:
        for pre in ("l'","d'","j'","n'","s'","c'","m'","t'","qu'"):
            if w.startswith(pre): w=w[len(pre):]
        if len(w)<=2 or w in STOP or w in NOISE: continue
        out.append(w)
    return out

def specificites(sub, sub_total, glob, glob_total, seuil=2.0, min_freq=3):
    specs={}
    for mot,f in sub.items():
        if f<min_freq: continue
        F=glob.get(mot,0)
        if F==0: continue
        esp=F*sub_total/glob_total
        if f>=esp:
            p=hypergeom.sf(f-1,glob_total,F,sub_total); sg=1
        else:
            p=hypergeom.cdf(f,glob_total,F,sub_total); sg=-1
        if p<=0: p=1e-300
        s=sg*(-math.log10(p))
        if s>=seuil: specs[mot]=round(s,2)
    return dict(sorted(specs.items(), key=lambda x:-x[1]))

# Champs lexicaux pour le radar comparatif
CHAMPS = {
 "Économie": ["économie","économique","emploi","emplois","richesse","argent","impôt","impôts","taxe","taxes","fiscal","pme","entreprise","entreprises","investissement","budget","déficit","coût","prospérité","affaires","dollars"],
 "Identité/langue": ["identité","français","langue","laïcité","valeurs","nation","culture","culturel","immigration","immigrants","francisation","québécoise","laïque"],
 "Environnement": ["climat","climatique","environnement","environnemental","carbone","ges","énergie","énergétique","transition","écologique","pollution","déchets","toxiques","eau","territoire","gaz","serre","renouvelable"],
 "Souveraineté": ["indépendance","souveraineté","souverain","pays","référendum","constitution","autonomie","république","fédéral","ottawa","autodétermination","national"],
 "Social/services": ["santé","éducation","logement","services","publics","social","sociale","soin","soins","hôpitaux","écoles","travailleurs","travailleuses","famille","familles","citoyens"],
 "Confrontation": ["crise","urgence","menace","lutte","combat","défendre","dénonce","contre","échec","scandale","inacceptable","refuser","stop","danger"],
}

def champs_norm(toks):
    n=max(len(toks),1); cnt=collections.Counter(toks)
    return {ch: round(sum(cnt.get(m,0) for m in mots)/n*10000,1) for ch,mots in CHAMPS.items()}

def cooccurrences(toks, cible, fenetre=4, top=12):
    """Mots apparaissant près d'un mot-cible (fenêtre glissante)."""
    co=collections.Counter()
    for i,w in enumerate(toks):
        if w==cible:
            for j in range(max(0,i-fenetre), min(len(toks),i+fenetre+1)):
                if j!=i: co[toks[j]]+=1
    return co.most_common(top)

corpus=json.load(open("/home/user/workspace/corpus_partis.json",encoding="utf-8"))
cq=json.load(open("/home/user/workspace/cq_corpus_clean.json",encoding="utf-8"))
corpus["Climat Québec"]=" ".join(d["titre"]+" "+d["texte"] for d in cq)

toks={p:tokens(t) for p,t in corpus.items()}
counts={p:collections.Counter(tk) for p,tk in toks.items()}
glob=collections.Counter()
for c_ in counts.values(): glob.update(c_)
gt=sum(glob.values())

res={"partis":{}}
for p in corpus:
    sub=counts[p]; st=sum(sub.values())
    res["partis"][p]={
      "specificites_ideologiques": dict(list(specificites(sub,st,glob,gt).items())[:20]),
      "champs_10k": champs_norm(toks[p]),
    }
# cooccurrences autour de mots-clés pour CQ
res["cooc_climat_cq"]=cooccurrences(toks["Climat Québec"],"climat")
res["cooc_indep_cq"]=cooccurrences(toks["Climat Québec"],"indépendance")

json.dump(res, open("/home/user/workspace/textometrie2_resultats.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)

print("=== SPÉCIFICITÉS IDÉOLOGIQUES (bruit filtré) ===")
for p,d in res["partis"].items():
    specs=list(d["specificites_ideologiques"].items())[:10]
    print(f"\n{p}: "+", ".join(f"{m}({s})" for m,s in specs))
print("\n=== CHAMPS LEXICAUX (‰0, pour 10k mots) ===")
partis=list(res["partis"].keys())
print(f"{'Champ':<16}"+"".join(f"{p[:8]:>10}" for p in partis))
for ch in CHAMPS:
    print(f"{ch:<16}"+"".join(f"{res['partis'][p]['champs_10k'][ch]:>10}" for p in partis))
print("\n=== COOCCURRENCES 'climat' (CQ) ===", res["cooc_climat_cq"][:8])
print("=== COOCCURRENCES 'indépendance' (CQ) ===", res["cooc_indep_cq"][:8])
