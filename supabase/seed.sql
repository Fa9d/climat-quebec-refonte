-- =============================================================================
-- SEED — Témoignages de test pour la table `temoignages`
-- Exécuter dans Supabase → SQL Editor
-- =============================================================================

INSERT INTO temoignages (prenom, region, dossier_slug, texte, valide, created_at) VALUES

-- Stablex / Blainville
(
  'Nathalie',
  'Blainville',
  'stablex',
  'Ma fille a développé des problèmes respiratoires depuis que l''agrandissement a commencé. Les résultats d''analyse de l''eau de notre puits nous ont convaincus de ne plus la boire. Nous ne voulons pas partir, mais nous ne pouvons pas rester comme ça.',
  true,
  NOW() - INTERVAL '12 days'
),
(
  'Marc-André',
  'Blainville',
  'stablex',
  'Je suis pompier volontaire depuis 22 ans à Blainville. Le jour où il y aura un incident majeur sur ce site, les ressources locales ne suffiront pas. Personne ne parle de la sécurité civile dans ce dossier.',
  true,
  NOW() - INTERVAL '8 days'
),
(
  'Josée',
  'Mirabel',
  'stablex',
  'Notre puits se trouve à moins de 2 km du site. On nous dit que c''est sécuritaire, mais les données que publie la coalition prouvent le contraire. Je veux juste la vérité.',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Alain',
  'Blainville',
  'stablex',
  'J''assiste aux assemblées depuis le début. Ce qui me frappe c''est que les experts mandatés par l''entreprise et ceux mandatés par les citoyens n''arrivent pas aux mêmes conclusions. Quelqu''un ment.',
  false,
  NOW() - INTERVAL '2 days'
),

-- TES Canada / Mauricie
(
  'Ginette',
  'Shawinigan',
  'tes-canada',
  'L''eau de la rivière Saint-Maurice, ça appartient au peuple québécois. Pas à une entreprise privée qui va la revendre sous forme d''hydrogène à des pays étrangers. C''est notre patrimoine.',
  true,
  NOW() - INTERVAL '15 days'
),
(
  'Robert',
  'Trois-Rivières',
  'tes-canada',
  'Je travaille dans le domaine industriel depuis 30 ans. Les projets comme TES Canada promettent des emplois mais les vrais emplois permanents se comptent sur les doigts d''une main. Les profits, eux, s''en vont ailleurs.',
  true,
  NOW() - INTERVAL '10 days'
),
(
  'Sylvie',
  'La Tuque',
  'tes-canada',
  'Notre municipalité n''a pas été consultée sérieusement. On a eu une soirée d''information avec des PowerPoint préfabriqués. Ce n''est pas de la consultation, c''est de la communication marketing.',
  true,
  NOW() - INTERVAL '6 days'
),

-- Méga-éoliennes privées / Centre-du-Québec
(
  'François',
  'Victoriaville',
  'mega-eoliennes-privees',
  'Je suis pour l''éolien. Je suis contre que des promoteurs privés s''enrichissent avec nos terres et notre vent pendant que les municipalités récoltent des miettes. Que ce soit public et les bénéfices resteront ici.',
  true,
  NOW() - INTERVAL '20 days'
),
(
  'Lucie',
  'Plessisville',
  'mega-eoliennes-privees',
  'Les éoliennes seront à 500 mètres de ma maison. Mon voisin a signé un bail et ne peut pas parler de la compensation. C''est ça la démocratie au Québec en 2026?',
  true,
  NOW() - INTERVAL '9 days'
),

-- Rio Tinto / Saguenay
(
  'Jean-Pierre',
  'Alma',
  'rio-tinto-alcan',
  'Mon père a travaillé à l''aluminerie toute sa vie. Je respecte les emplois que ça crée. Mais les droits sur la Péribonka ont été négociés il y a 80 ans dans des conditions que personne n''accepterait aujourd''hui. Il faut renégocier.',
  true,
  NOW() - INTERVAL '18 days'
),
(
  'Carole',
  'Chicoutimi',
  'rio-tinto-alcan',
  'Nos barrages, notre eau, nos ressources. Une multinationale australienne décide de la gestion de nos rivières. Quelqu''un peut m''expliquer comment c''est acceptable?',
  true,
  NOW() - INTERVAL '4 days'
),

-- Transport collectif
(
  'David',
  'Rimouski',
  'transport-collectif',
  'En région, ne pas avoir de voiture ce n''est pas un choix écologique, c''est une exclusion sociale. Il n''y a aucun transport le soir et le week-end. Ce n''est pas du transport collectif, c''est du transport pour ceux qui n''ont pas d''autre option.',
  true,
  NOW() - INTERVAL '22 days'
),
(
  'Amélie',
  'Sherbrooke',
  'transport-collectif',
  'J''ai 19 ans. Je ne conduis pas encore. Pour aller au CÉGEP depuis mon village, je dois partir à 6h du matin avec un parent ou payer un taxi. Aucun parti ne parle de nous.',
  true,
  NOW() - INTERVAL '7 days'
),

-- Lithium / régions minières
(
  'Benoit',
  'Val-d''Or',
  'lithium-mines',
  'On nous a vendu le lithium comme la solution verte. Mais les impacts sur le territoire sont les mêmes que n''importe quelle mine. Sauf qu''on ne peut plus critiquer sans se faire traiter d''anti-environnementaliste. C''est de la récupération.',
  true,
  NOW() - INTERVAL '14 days'
);
