import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow type="vertical" label="Email address">
				<Input
					id="email"
					type="email"
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormRow>
			<FormRow type="vertical" label="Password">
				<Input
					id="password"
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRow>
			<FormRow type="vertical">
				<Button size="large">Log In</Button>
			</FormRow>
		</Form>
	);
};

export default LoginForm;
