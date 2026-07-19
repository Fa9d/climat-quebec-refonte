import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  // Client instancié dans la fonction — ne plante pas si les env vars sont absentes au build
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await req.json();

    const {
      nomOuPseudonyme,
      dossierSlug,
      dateObservation,
      lieuPrecis,
      description,
      impactConcret,
      consentement,
    } = body as {
      nomOuPseudonyme: string;
      dossierSlug:     string;
      dateObservation: string;
      lieuPrecis:      string;
      description:     string;
      impactConcret?:  string;
      consentement:    "public-nomme" | "public-anonyme" | "interne-seulement";
    };

    if (
      !nomOuPseudonyme?.trim() ||
      !dossierSlug ||
      !dateObservation ||
      !lieuPrecis?.trim() ||
      !description?.trim() ||
      description.trim().length < 30 ||
      !["public-nomme", "public-anonyme", "interne-seulement"].includes(consentement)
    ) {
      return NextResponse.json(
        { error: "Données invalides ou manquantes." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("temoignages")
      .insert({
        nom_ou_pseudonyme: nomOuPseudonyme.trim(),
        dossier_slug:      dossierSlug,
        date_observation:  dateObservation,
        lieu_precis:       lieuPrecis.trim(),
        description:       description.trim(),
        impact_concret:    impactConcret?.trim() || null,
        consentement,
      });

    if (error) {
      console.error("[temoignages] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement. Veuillez réessayer." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[temoignages] Unexpected error:", err);
    return NextResponse.json(
      { error: "Erreur serveur inattendue." },
      { status: 500 }
    );
  }
}
