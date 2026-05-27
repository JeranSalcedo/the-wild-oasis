import { supabase, supabaseUrl } from "./supabase";

const getCabins = async () => {
	const { data, error } = await supabase.from("cabins").select();

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
};

const uploadImage = async (image) => {
	const isNewImage = image !== null && typeof image === "object";
	const imageName = isNewImage
		? `${crypto.randomUUID()}-${image.name}`.replaceAll("/", "")
		: image.split("/").at(-1);

	if (isNewImage) {
		const { error } = await supabase.storage
			.from("cabin-images")
			.upload(imageName, image);

		if (error) {
			console.error(error);
			throw new Error("Cabin image failed to upload");
		}
	}

	const imagePath = isNewImage
		? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
		: image;
	return { imageName, imagePath };
};

const formatCabin = ({
	name,
	description,
	imagePath,
	maxCapacity,
	basePrice,
	discount,
}) => ({
	name,
	description,
	image_url: imagePath,
	max_capacity: maxCapacity,
	base_price: basePrice,
	discount,
});

const createCabin = async (cabin) => {
	const { imageName, imagePath } = await uploadImage(cabin.image);

	const cabinData = formatCabin({ ...cabin, imagePath });

	const { data, error } = await supabase.from("cabins").insert([cabinData]);

	if (error) {
		await supabase.storage.from("cabin-images").remove([imageName]);

		console.error(error);
		throw new Error("Cabin could not be created");
	}

	return data;
};

const updateCabin = async ({ id, cabin }) => {
	const { imagePath } = await uploadImage(cabin.image);

	const cabinData = formatCabin({ ...cabin, imagePath });

	const { data, error } = await supabase
		.from("cabins")
		.update(cabinData)
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	return data;
};

const deleteCabin = async ({ id }) => {
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
