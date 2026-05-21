import { supabase } from "./supabase";

const getSettings = async () => {
	const { data, error } = await supabase
		.from("settings")
		.select("*")
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data;
};

export { getSettings };
