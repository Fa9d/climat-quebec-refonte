import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Client Supabase côté navigateur.
 * Utilise la clé anon — les politiques RLS garantissent que
 * l'anonyme ne peut qu'insérer dans `temoignages`.
 */
export const supabase = createClient<Database>(url, anon);
