import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

const SignupForm = () => {
	const { isLoading, signup } = useSignup();

	const { register, handleSubmit, getValues, formState, reset, resetField } =
		useForm({
			defaultValues: {
				name: "",
				email: "",
				password: "",
				passwordConfirm: "",
			},
		});
	const { errors } = formState;

	const onSubmit = (data) => {
		signup(data, {
			onSuccess: () => reset(),
			onError: () => {
				resetField("password");
				resetField("passwordConfirm");
			},
		});
	};

	const onError = () => {
		resetField("password", { keepError: true });
		resetField("passwordConfirm", { keepError: true });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Full name" error={errors?.name?.message}>
				<Input
					id="name"
					type="text"
					disabled={isLoading}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					id="email"
					type="email"
					disabled={isLoading}
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email address",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Password" error={errors?.password?.message}>
				<Input
					id="password"
					type="password"
					disabled={isLoading}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message:
								"Passwords needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					id="passwordConfirm"
					type="password"
					disabled={isLoading}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === getValues().password ||
							"Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button disabled={isLoading}>Create new user</Button>
				<Button
					type="reset"
					$variation="secondary"
					disabled={isLoading}
				>
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default SignupForm;
