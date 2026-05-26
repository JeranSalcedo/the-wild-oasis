import { supabase } from "./supabase";

const login = async ({ email, password }) => {
	const {
		data: { user },
		error,
	} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return user;
};

const getCurrentUserID = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) return null;

	return session.user.id;
};

const getCurrentUser = async () => {
	getCurrentUserID();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return user;
};

const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
};

export { login, getCurrentUserID, getCurrentUser, logout };
