import { useForm } from "react-hook-form";

import { useUpdatePassword } from "./useUpdatePassword";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const UpdatePasswordForm = () => {
	const { isUpdating, updatePassword } = useUpdatePassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm({
		defaultValues: {
			password: "",
			passwordConfirm: "",
		},
	});

	const onSubmit = ({ password }) => {
		updatePassword(password, { onSettled: () => reset() });
	};

	const onError = () => {
		reset({ password: "", passwordConfirm: "" }, { keepErrors: true });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="New Password" error={errors?.password?.message}>
				<Input
					id="password"
					type="password"
					autoComplete="current-password"
					disabled={isUpdating}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>
			<FormRow
				label="Confirm new password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					id="passwordConfirm"
					type="password"
					autoComplete="new-password"
					disabled={isUpdating}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === getValues().password ||
							"Passwords need to match",
					})}
				/>
			</FormRow>
			<FormRow>
				<Button disabled={isUpdating}>Update password</Button>
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

export default UpdatePasswordForm;
