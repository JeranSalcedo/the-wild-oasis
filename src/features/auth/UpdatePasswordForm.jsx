import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const UpdatePasswordForm = () => {
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

	const onSubmit = (data) => {
		console.log(data);
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
					disabled={false}
					{...register("password", {
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
					disabled={false}
					{...register("passwordConfirm", {
						validate: (value) =>
							value === getValues().password ||
							"Passwords need to match",
					})}
				/>
			</FormRow>
			<FormRow>
				<Button disabled={false}>Update password</Button>
				<Button type="reset" $variation="secondary" disabled={false}>
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default UpdatePasswordForm;
