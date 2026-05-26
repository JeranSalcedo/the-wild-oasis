import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";

const SignupForm = () => {
	const { register, handleSubmit, getValues, formState, reset } = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});
	const { errors } = formState;

	const onSubmit = () => {
		reset();
	};

	const onError = (errors) => {
		console.log(errors);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Full name" error={errors?.name?.message}>
				<Input
					id="name"
					type="text"
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					id="email"
					type="email"
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
					id="password"
					type="password"
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === getValues().password ||
							"Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button>Create new user</Button>
				<Button type="reset" $variation="secondary">
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default SignupForm;
