import { supabase, supabaseUrl } from "./supabase";

const getCabins = async () => {
	const { data, error } = await supabase.from("cabins").select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be laoded");
	}

	return data;
};

const createCabin = async (cabin) => {
	const imageName = `${crypto.randomUUID()}-${cabin.image.name}`.replaceAll(
		"/",
		"",
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, cabin.image);

	if (storageError) {
		console.error(storageError);
		throw new Error("Cabin image failed to upload");
	}

	const { data, error } = await supabase.from("cabins").insert([
		{
			name: cabin.name,
			description: cabin.description,
			image_url: imagePath,
			max_capacity: cabin.maxCapacity,
			base_price: cabin.basePrice,
			discount: cabin.discount,
		},
	]);

	if (error) {
		await supabase.storage.from("cabin-images").remove([imageName]);

		console.error(error);
		throw new Error("Cabin could not be created");
	}

	return data;
};

const updateCabin = async (id, cabin) => {
	const isNewImage = cabin.image !== null && typeof cabin.image === "object";
	const imageName = `${crypto.randomUUID()}-${cabin.image.name}`.replaceAll(
		"/",
		"",
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	if (isNewImage) {
		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, cabin.image);

		if (storageError) {
			console.error(storageError);
			throw new Error("Cabin image failed to upload");
		}
	}

	const { data, error } = await supabase
		.from("cabins")
		.update({
			name: cabin.name,
			description: cabin.description,
			image_url: isNewImage ? imagePath : cabin.image,
			max_capacity: cabin.maxCapacity,
			base_price: cabin.basePrice,
			discount: cabin.discount,
		})
		.eq("id", id);

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

export { getCabins, createCabin, updateCabin, deleteCabin };
