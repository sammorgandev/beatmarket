"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { User } from "@supabase/supabase-js";

export const signIn = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect("/login?message=Could not authenticate user");
	}

	return redirect("/");
};

export const signUp = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		return redirect("/login?message=Could not authenticate user");
	}

	return redirect("/login?message=Check email to continue sign in process");
};

export const signOut = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { error } = await supabase.auth.signOut();
	if (error) {
		return redirect("/login?message=Could not sign out");
	}
	return redirect("/");
};

export async function getCurrentUser(): Promise<User> {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: user } = await supabase.auth.getUser();
	return user.user as User;
}
