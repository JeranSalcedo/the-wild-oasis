import { supabase } from "./supabase";

const getCabins = async () => {
	const { data, error } = await supabase.from("cabins").select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be laoded");
	}

	return data;
};

const createCabin = async (cabin) => {
	const { data, error } = await supabase.from("cabins").insert([cabin]);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	return data;
};

const deleteCabin = async (id) => {
	if (!id) {
		throw new Error("Missing id");
	}

	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	return data;
};

export { getCabins, createCabin, deleteCabin };
