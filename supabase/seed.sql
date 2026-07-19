-- =============================================================================
-- SEED — Témoignages de test pour la table `temoignages`
-- Colonnes réelles : nom_ou_pseudonyme, dossier_slug, date_observation,
--                    lieu_precis, description, impact_concret,
--                    consentement, valide, notes_editoriales
-- Exécuter dans Supabase → SQL Editor
-- =============================================================================

INSERT INTO temoignages
  (nom_ou_pseudonyme, dossier_slug, date_observation, lieu_precis,
   description, impact_concret, consentement, valide, created_at)
VALUES

-- ── Stablex / Blainville ────────────────────────────────────────────────────
(
  'Nathalie B.',
  'stablex',
  '2026-06-10',
  'Blainville, secteur nord — rue des Érables',
  'Ma fille a développé des problèmes respiratoires depuis que l''agrandissement a commencé. Les résultats d''analyse de l''eau de notre puits nous ont convaincus de ne plus la boire. Nous ne voulons pas partir, mais nous ne pouvons pas rester comme ça.',
  'Enfant de 8 ans avec bronchites à répétition depuis automne 2025. Dépenses en eau embouteillée : ~80 $/mois.',
  'public-nomme',
  true,
  NOW() - INTERVAL '12 days'
),
(
  'Marc-André L.',
  'stablex',
  '2026-05-22',
  'Blainville — caserne 50',
  'Je suis pompier volontaire depuis 22 ans à Blainville. Le jour où il y aura un incident majeur sur ce site, les ressources locales ne suffiront pas. Personne ne parle de la sécurité civile dans ce dossier.',
  'Plan d’urgence municipal à revoir. Aucune simulation menée depuis 2019.',
  'public-nomme',
  true,
  NOW() - INTERVAL '8 days'
),
(
  'Josée T.',
  'stablex',
  '2026-06-01',
  'Mirabel, chemin de la Coté,  2,1 km du site',
  'Notre puits se trouve à moins de 2 km du site. On nous dit que c''est sécuritaire, mais les données que publie la coalition prouvent le contraire. Je veux juste la vérité.',
  'Propriété invendable selon deux évaluateurs. Valeur estimée perdue : 85 000 $.',
  'public-anonyme',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Alain P.',
  'stablex',
  '2026-07-01',
  'Blainville — salle communautaire, assemblée publique',
  'J''assiste aux assemblées depuis le début. Ce qui me frappe c''est que les experts mandatés par l''entreprise et ceux mandatés par les citoyens n''arrivent pas aux mêmes conclusions. Quelqu''un ment.',
  NULL,
  'public-nomme',
  false,
  NOW() - INTERVAL '2 days'
),

-- ── TES Canada / Mauricie ───────────────────────────────────────────────────
(
  'Ginette F.',
  'tes-canada',
  '2026-04-15',
  'Shawinigan — bord de la rivière Saint-Maurice',
  'L''eau de la rivière Saint-Maurice, ça appartient au peuple québécois. Pas à une entreprise privée qui va la revendre sous forme d''hydrogène à des pays étrangers. C''est notre patrimoine.',
  'Captage prévu : jusqu’à 40 000 m³/jour selon les documents de présentation.',
  'public-nomme',
  true,
  NOW() - INTERVAL '15 days'
),
(
  'Robert D.',
  'tes-canada',
  '2026-04-20',
  'Trois-Rivières — zone industrielle port',
  'Je travaille dans le domaine industriel depuis 30 ans. Les projets comme TES Canada promettent des emplois mais les vrais emplois permanents se comptent sur les doigts d''une main. Les profits, eux, s''en vont ailleurs.',
  '45 emplois permanents promis pour un investissement de 1,2 G$. Comparaison : usine Bombardier créait 800 emplois stables.',
  'public-nomme',
  true,
  NOW() - INTERVAL '10 days'
),
(
  'Sylvie M.',
  'tes-canada',
  '2026-03-12',
  'La Tuque — centre communautaire, soirée d’information',
  'Notre municipalité n''a pas été consultée sérieusement. On a eu une soirée d''information avec des PowerPoint préfabriqués. Ce n''est pas de la consultation, c''est de la communication marketing.',
  'Aucune étude d’impact indépendante remise aux élus municipaux avant la soirée.',
  'public-anonyme',
  true,
  NOW() - INTERVAL '6 days'
),

-- ── Méga-éoliennes privées / Centre-du-Québec ──────────────────────────────
(
  'François B.',
  'mega-eoliennes-privees',
  '2026-05-30',
  'Victoriaville — assemblée du conseil de ville',
  'Je suis pour l''éolien. Je suis contre que des promoteurs privés s''enrichissent avec nos terres et notre vent pendant que les municipalités récoltent des miettes. Que ce soit public et les bénéfices resteront ici.',
  'Redevances municipales offertes : 3 000 $/éolienne/an. Revenus estimés du promoteur : 2,4 M$/éolienne sur 20 ans.',
  'public-nomme',
  true,
  NOW() - INTERVAL '20 days'
),
(
  'Anonyme',
  'mega-eoliennes-privees',
  '2026-06-18',
  'Plessisville — propriété agricole, rang 7',
  'Les éoliennes seront à 500 mètres de ma maison. Mon voisin a signé un bail et ne peut pas parler de la compensation. C''est ça la démocratie au Québec en 2026?',
  'Clause de confidentialité intégrée dans les baux de gré à gré avec les propriétaires voisins.',
  'public-anonyme',
  true,
  NOW() - INTERVAL '9 days'
),

-- ── Rio Tinto / Saguenay – Lac-Saint-Jean ───────────────────────────────────
(
  'Jean-Pierre V.',
  'rio-tinto-alcan',
  '2026-01-20',
  'Alma — réunion syndicale, usine Alcan',
  'Mon père a travaillé à l''aluminerie toute sa vie. Je respecte les emplois que ça crée. Mais les droits sur la Péribonka ont été négociés il y a 80 ans dans des conditions que personne n''accepterait aujourd''hui. Il faut renégocier.',
  'Contrat hydroélectrique renouvelé en 2019 sans appel d’offres public ni débat parlementaire.',
  'public-nomme',
  true,
  NOW() - INTERVAL '18 days'
),
(
  'Carole G.',
  'rio-tinto-alcan',
  '2026-07-05',
  'Chicoutimi — rive de la rivière Péribonka',
  'Nos barrages, notre eau, nos ressources. Une multinationale australienne décide de la gestion de nos rivières. Quelqu''un peut m''expliquer comment c''est acceptable?',
  NULL,
  'public-nomme',
  true,
  NOW() - INTERVAL '4 days'
),

-- ── Transport collectif ─────────────────────────────────────────────────────
(
  'David R.',
  'transport-collectif',
  '2026-02-10',
  'Rimouski — arrêt d’autobus rue Saint-Germàin',
  'En région, ne pas avoir de voiture ce n''est pas un choix écologique, c''est une exclusion sociale. Il n''y a aucun transport le soir et le week-end. Ce n''est pas du transport collectif, c''est du transport pour ceux qui n''ont pas d''autre option.',
  'Dernier départ vers les quartiers est : 18h15. Population sans voiture dans la zone : ~2 400 personnes.',
  'public-nomme',
  true,
  NOW() - INTERVAL '22 days'
),
(
  'Amélie C.',
  'transport-collectif',
  '2026-06-05',
  'Village de Saint-Mathieu-de-Rioux — arrêt de chemin',
  'J''ai 19 ans. Je ne conduis pas encore. Pour aller au CÉGEP depuis mon village, je dois partir à 6h du matin avec un parent ou payer un taxi. Aucun parti ne parle de nous.',
  'Coût taxi aller-retour : 48 $. Bourse étudiante mensuelle : 280 $. Impossible à absorber.',
  'public-nomme',
  true,
  NOW() - INTERVAL '7 days'
),

-- ── Lithium / régions minières ──────────────────────────────────────────────
(
  'Benoit L.',
  'lithium-mines',
  '2026-03-28',
  'Val-d''Or — zone de prospection lac Preissac',
  'On nous a vendu le lithium comme la solution verte. Mais les impacts sur le territoire sont les mêmes que n''importe quelle mine. Sauf qu''on ne peut plus critiquer sans se faire traiter d''anti-environnementaliste. C''est de la récupération.',
  'Zone de prospection : 340 km². Aucune consultation des communautés riveraines avant l’octroi des claims.',
  'public-nomme',
  true,
  NOW() - INTERVAL '14 days'
);
