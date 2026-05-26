import { supabase } from "./supabase";

import { getCurrentUserID } from "./apiAuth";

const getCurrentUserProfile = async () => {
	const id = await getCurrentUserID();

	if (!id) return null;

	const { data, error } = await supabase
		.from("profiles")
		.select("id, name, avatar_url")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error(error.message);
	}

	return data;
};

export { getCurrentUserProfile };
