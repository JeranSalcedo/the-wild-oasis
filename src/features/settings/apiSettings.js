import { supabase } from "../../services/supabase";

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

const updateSetting = async (setting) => {
	const { data, error } = await supabase
		.from("settings")
		.update(setting)
		.eq("id", 1)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be updated");
	}

	return data;
};

export { getSettings, updateSetting };
