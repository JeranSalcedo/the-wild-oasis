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

const getCurrentUser = async () => {
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

export { login, getCurrentUser };
