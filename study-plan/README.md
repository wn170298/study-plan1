# Study Plan (Next.js + Supabase)

A tiny app to store final exam entries (course, test datetime, classroom) in Supabase. Designed for quick deploy to Vercel.

Quick setup

1. Create a Supabase project at https://app.supabase.com and copy the project URL and anon key.
2. Open the SQL editor in Supabase and run `sql/create_tables.sql` to create the `finals` table.
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Local dev

```bash
cd study-plan
npm install
npm run dev
```

Push to GitHub

```bash
git add study-plan && git commit -m "Add study-plan scaffold" && git push origin main
```

Deploy to Vercel

- Import the repository in Vercel (https://vercel.com/new)
- Set the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project settings.
- Deploy.

Security note

This scaffold uses the anon key for client-side operations which is fine for development/testing if you restrict table policies in Supabase properly. For production, secure inserts/updates with Auth or server-side functions using the service role key.
