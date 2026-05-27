import { useState } from "react";
import { useAuth } from "../../features/auth/useAuth";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const UpdateUserProfileForm = () => {
	const {
		user: { email },
	} = useAuth();

	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(name);
		console.log(avatar);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input value={name} onChange={(e) => setName(e.target.value)} />
			</FormRow>
			<FormRow label="Avatar">
				<FileInput
					accept="image/*"
					onChange={(e) => setAvatar(e.target.files.item(0))}
				/>
			</FormRow>
			<FormRow>
				<Button>Update account</Button>
				<Button type="reset" $variation="secondary">
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default UpdateUserProfileForm;
