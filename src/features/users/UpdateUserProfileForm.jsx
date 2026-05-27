import { useRef, useState } from "react";

import { useAuth } from "../../features/auth/useAuth";
import { useCurrentUserProfile } from "./useCurrentUserProfile";
import { useUpdateCurrentUserProfile } from "./useUpdateCurrentUserProfile";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const UpdateUserProfileForm = () => {
	const {
		user: { email },
	} = useAuth();
	const { profile: { name: currentName } = {} } = useCurrentUserProfile();

	const { isUpdating, updateProfile } = useUpdateCurrentUserProfile();

	const [name, setName] = useState(currentName ?? "");
	const [avatar, setAvatar] = useState(null);
	const avatarInputRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		const validName = name && name !== currentName;

		if (!validName && !avatar) return;

		const data = {};

		if (validName) data.name = name;
		if (avatar) data.avatar = avatar;

		updateProfile(data, {
			onSettled: () => {
				avatarInputRef.current.value = "";
				setAvatar(null);
			},
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Avatar">
				<FileInput
					ref={avatarInputRef}
					accept="image/*"
					onChange={(e) => setAvatar(e.target.files.item(0))}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<Button disabled={isUpdating}>Update account</Button>
				<Button
					type="reset"
					$variation="secondary"
					disabled={isUpdating}
				>
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default UpdateUserProfileForm;
