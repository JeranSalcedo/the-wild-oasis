import { useState } from "react";

import { useLogin } from "./useLogIn";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

const LoginForm = () => {
	const { isLoading, login } = useLogin();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email || !password) return;

		login(
			{ email, password },
			{
				onSettled: () => {
					setPassword("");
				},
			},
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow type="vertical" label="Email address">
				<Input
					id="email"
					type="email"
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</FormRow>
			<FormRow type="vertical" label="Password">
				<Input
					id="password"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
				/>
			</FormRow>
			<FormRow type="vertical">
				<Button size="large" disabled={isLoading}>
					{isLoading ? <SpinnerMini /> : "Log In"}
				</Button>
			</FormRow>
		</Form>
	);
};

export default LoginForm;
