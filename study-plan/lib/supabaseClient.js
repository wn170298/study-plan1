import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function makeMock() {
	const res = { data: [], error: null };
	const chain = {
		select: async () => res,
		insert: async () => res,
		delete: async () => res,
		order() { return this; },
		eq() { return this; }
	};
	return { from: () => chain };
}

export const supabase = (supabaseUrl && supabaseAnonKey)
	? createClient(supabaseUrl, supabaseAnonKey)
	: makeMock();

// Note: In production you should set NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel project settings so the real
// client is created during build/runtime. This mock prevents build-time
// failures when those vars are not available (e.g., during preview).
