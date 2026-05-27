import { supabase } from "./supabase";

const signup = async ({ name, email, password }) => {
	const {
		data: { user },
		error,
	} = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	const { data: profile, error: profileError } = await supabase
		.from("profiles")
		.insert({ id: user.id, name })
		.select()
		.single();

	if (profileError) {
		console.error(profileError);
		throw new Error(profileError.message);
	}

	return { user, profile };
};

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
	if (!(await getCurrentUserID())) return null;

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

const updatePassword = async (password) => {
	const { data, error } = await supabase.auth.updateUser({ password });

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data;
};

const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}
};

export {
	signup,
	login,
	getCurrentUserID,
	getCurrentUser,
	updatePassword,
	logout,
};
