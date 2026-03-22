# Flavor Bar — VaporStation & Εν Ατμώ

Βιβλιοθήκη/portfolio flavor shots για ηλεκτρονικό τσιγάρο. Οι πελάτες μπορούν να αναζητήσουν και να φιλτράρουν τα υγρά με βάση γεύση, ένταση πάγου, γλυκύτητα, τιμή και πολλά ακόμη.

## Features

- Αναζήτηση κατά όνομα, συστατικά και περιγραφή
- Φίλτρα: Γευστικό Προφίλ, Τελικός Όγκος, Τιμή, Συστατικά, Ένταση Πάγου, Γλυκύτητα
- Κάρτες προϊόντων με όλα τα δεδομένα (χωρίς σελίδα προϊόντος)
- Dark/Light mode
- Responsive design (mobile-friendly)
- Back navigation
- Supabase backend

## Tech Stack

- **Frontend:** Vue 3 + Vite + Tailwind CSS 3
- **Backend:** Supabase (PostgreSQL)
- **Deployment:** Netlify

## Setup

```bash
npm install
```

Δημιούργησε αρχείο `.env` με:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Supabase Schema

```sql
CREATE TABLE flavor_shots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  flavor_profile TEXT NOT NULL,
  product_url TEXT,
  final_volume TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  price NUMERIC(6,2) NOT NULL,
  ice_intensity INTEGER NOT NULL DEFAULT 0,
  sweetness_intensity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
