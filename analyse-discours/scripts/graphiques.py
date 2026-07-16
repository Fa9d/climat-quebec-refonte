#!/usr/bin/env python3
"""Génère les visualisations de l'analyse du discours (rendu propre, palette sobre)."""
import json, collections, math
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
import numpy as np
import networkx as nx

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 11,
    "axes.facecolor":"#ffffff",
    "figure.facecolor":"#ffffff", "axes.edgecolor":"#333333",
    "axes.grid": False, "savefig.dpi": 150, "savefig.bbox":"tight",
})
COUL = {"CAQ":"#00aeef","PQ":"#004a99","PLQ":"#d71920","QS":"#f58220","PCQ":"#1d3f6e","Climat Québec":"#2e8b57"}

res = json.load(open("/home/user/workspace/textometrie2_resultats.json",encoding="utf-8"))
res1 = json.load(open("/home/user/workspace/textometrie_resultats.json",encoding="utf-8"))
partis = list(res["partis"].keys())

# ---------- 1. RADAR des champs lexicaux ----------
champs = list(next(iter(res["partis"].values()))["champs_10k"].keys())
N = len(champs)
angles = [n/float(N)*2*math.pi for n in range(N)] + [0]
fig, axes = plt.subplots(2,3, figsize=(15,10), subplot_kw=dict(polar=True))
axes = axes.flatten()
# échelle max commune
maxval = max(res["partis"][p]["champs_10k"][c] for p in partis for c in champs)
for idx,p in enumerate(partis):
    ax=axes[idx]
    vals=[res["partis"][p]["champs_10k"][c] for c in champs]; vals+=vals[:1]
    ax.plot(angles, vals, color=COUL[p], linewidth=2.2)
    ax.fill(angles, vals, color=COUL[p], alpha=0.25)
    ax.set_xticks(angles[:-1]); ax.set_xticklabels(champs, size=9)
    ax.set_ylim(0, maxval*1.05); ax.set_yticklabels([])
    ax.set_title(p, color=COUL[p], size=14, weight="bold", pad=18)
fig.suptitle("Profil discursif comparé — poids des champs lexicaux (‰ pour 10 000 mots)",
             size=15, weight="bold", y=1.01)
plt.tight_layout(); plt.savefig("/home/user/workspace/fig1_radar_champs.png"); plt.close()

# ---------- 2. Barres horizontales : spécificités idéologiques par parti ----------
fig, axes = plt.subplots(2,3, figsize=(16,10))
axes=axes.flatten()
for idx,p in enumerate(partis):
    ax=axes[idx]
    items=list(res["partis"][p]["specificites_ideologiques"].items())[:10][::-1]
    mots=[m for m,_ in items]; sc=[s for _,s in items]
    ax.barh(range(len(mots)), sc, color=COUL[p], alpha=0.85)
    ax.set_yticks(range(len(mots))); ax.set_yticklabels(mots, size=10)
    ax.set_title(p, color=COUL[p], size=13, weight="bold")
    ax.set_xlabel("indice de spécificité (Lafon)", size=9)
    for sp in ["top","right"]: ax.spines[sp].set_visible(False)
fig.suptitle("Mots sur-employés par chaque parti (modèle hypergéométrique de Lafon)",
             size=15, weight="bold", y=1.01)
plt.tight_layout(); plt.savefig("/home/user/workspace/fig2_specificites.png"); plt.close()

# ---------- 3. Indicateurs critiques : nous/eux & dramatisation/futur ----------
ic={p:res1["partis"][p]["indicateurs_critiques"] for p in partis}
fig, (a1,a2)=plt.subplots(1,2, figsize=(15,6))
x=np.arange(len(partis))
r_ne=[ic[p]["ratio_nous_eux"] for p in partis]
a1.bar(x, r_ne, color=[COUL[p] for p in partis], alpha=0.85)
labels_courts=[("Climat Q." if p=="Climat Québec" else p) for p in partis]
a1.axhline(1, ls="--", color="#888", lw=1); a1.set_xticks(x); a1.set_xticklabels(labels_courts, rotation=20, size=9)
a1.set_title("Ratio « nous » / « eux »\n(>1 = discours de rassemblement ; élevé = clivage populiste)", size=11, weight="bold")
for sp in ["top","right"]: a1.spines[sp].set_visible(False)
for i,v in enumerate(r_ne): a1.text(i, v+0.05, f"{v}", ha="center", size=9)
r_df=[ic[p]["ratio_dramat_futur"] for p in partis]
a2.bar(x, r_df, color=[COUL[p] for p in partis], alpha=0.85)
a2.axhline(1, ls="--", color="#888", lw=1); a2.set_xticks(x); a2.set_xticklabels(labels_courts, rotation=20, size=9)
a2.set_title("Ratio dramatisation / projet d'avenir\n(>1 = discours de crise ; <1 = discours de projet)", size=11, weight="bold")
for sp in ["top","right"]: a2.spines[sp].set_visible(False)
for i,v in enumerate(r_df): a2.text(i, v+0.02, f"{v}", ha="center", size=9)
fig.suptitle("Marqueurs d'analyse critique du discours", size=15, weight="bold", y=1.02)
plt.tight_layout(); plt.savefig("/home/user/workspace/fig3_indicateurs.png"); plt.close()

# ---------- 4. Réseau de cooccurrences autour de 'climat' et 'indépendance' (CQ) ----------
G=nx.Graph()
for base,key,col in [("climat","cooc_climat_cq","#2e8b57"),("indépendance","cooc_indep_cq","#8b2e5f")]:
    G.add_node(base, taille=2600, couleur=col)
    for mot,poids in res1.get(key, res.get(key,[]))[:8] if False else res[key][:8]:
        if mot==base: continue
        G.add_node(mot, taille=900, couleur="#cfe8dc" if col=="#2e8b57" else "#e8cfdd")
        G.add_edge(base, mot, weight=poids)
plt.figure(figsize=(12,8))
pos=nx.spring_layout(G, k=0.9, seed=42)
nx.draw_networkx_edges(G, pos, width=[G[u][v]["weight"]/8 for u,v in G.edges()], edge_color="#bbbbbb", alpha=0.7)
nx.draw_networkx_nodes(G, pos, node_size=[G.nodes[n]["taille"] for n in G], node_color=[G.nodes[n]["couleur"] for n in G])
nx.draw_networkx_labels(G, pos, font_size=11, font_family="DejaVu Sans")
plt.title("Fusion conceptuelle chez Climat Québec :\nréseau de mots autour de « climat » (vert) et « indépendance » (mauve)",
          size=13, weight="bold")
plt.axis("off"); plt.tight_layout(); plt.savefig("/home/user/workspace/fig4_reseau_cq.png"); plt.close()

print("4 figures générées : fig1_radar_champs.png, fig2_specificites.png, fig3_indicateurs.png, fig4_reseau_cq.png")
