import { supabase, supabaseUrl } from "../../services/supabase";

import { getCurrentUserID } from "../auth/apiAuth";

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

const updateCurrentUserProfile = async ({ name, avatar }) => {
	const id = await getCurrentUserID();

	if (!id) return null;

	const updateData = {};

	if (name) updateData.name = name;

	if (avatar) {
		const avatarName = `${crypto.randomUUID()}-${avatar.name}`.replaceAll(
			"/",
			"",
		);
		const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${id}/${avatarName}`;
		const { error: avatarError } = await supabase.storage
			.from("avatars")
			.upload(`${id}/${avatarName}`, avatar);
		if (avatarError) {
			console.error(avatarError);
			throw new Error("Avatar failed to upload");
		}
		updateData.avatar_url = imagePath;
	}

	const { data, error } = await supabase
		.from("profiles")
		.update(updateData)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Profile could not be updated");
	}

	return data;
};

export { getCurrentUserProfile, updateCurrentUserProfile };
