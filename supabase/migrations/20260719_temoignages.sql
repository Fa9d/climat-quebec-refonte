-- =============================================================================
-- Migration : table temoignages
-- Projet    : Climat Québec
-- Date      : 2026-07-19
-- =============================================================================

create table if not exists public.temoignages (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),

  -- Identification
  nom_ou_pseudonyme   text        not null check (char_length(nom_ou_pseudonyme) >= 1),
  dossier_slug        text        not null,

  -- Observation
  date_observation    date        not null,
  lieu_precis         text        not null check (char_length(lieu_precis) >= 3),
  description         text        not null check (char_length(description) >= 30),
  impact_concret      text,

  -- Consentement
  consentement        text        not null
                        check (consentement in ('public-nomme','public-anonyme','interne-seulement')),

  -- Modération
  valide              boolean     not null default false,
  notes_editoriales   text
);

-- Index utiles pour le tableau de bord coordinateur
create index if not exists temoignages_dossier_idx  on public.temoignages (dossier_slug);
create index if not exists temoignages_valide_idx   on public.temoignages (valide);
create index if not exists temoignages_created_idx  on public.temoignages (created_at desc);

-- ----------------------------------------------------------------
-- Row Level Security
-- ----------------------------------------------------------------
alter table public.temoignages enable row level security;

-- Tout le monde peut insérer (formulaire public)
create policy "insert_public"
  on public.temoignages
  for insert
  to anon
  with check (true);

-- Seul un utilisateur authentifié (coordinateur) peut lire
create policy "select_authenticated"
  on public.temoignages
  for select
  to authenticated
  using (true);

-- Seul un coordinateur peut mettre à jour (validation, notes)
create policy "update_authenticated"
  on public.temoignages
  for update
  to authenticated
  using (true);

-- ----------------------------------------------------------------
-- Vue publique : uniquement les témoignages validés + non privés
-- (utilisée par le front pour afficher les témoignages dans les dossiers)
-- ----------------------------------------------------------------
create or replace view public.temoignages_publics as
  select
    id,
    created_at,
    dossier_slug,
    date_observation,
    lieu_precis,
    description,
    impact_concret,
    case
      when consentement = 'public-nomme'   then nom_ou_pseudonyme
      when consentement = 'public-anonyme' then 'Anonyme'
    end as auteur_affiche
  from public.temoignages
  where valide = true
    and consentement in ('public-nomme', 'public-anonyme');
