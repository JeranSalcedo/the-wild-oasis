import styled from "styled-components";

import Heading from "../ui/Heading";
import LoginForm from "../features/auth/LogInForm";
import Logo from "../ui/Logo";

const StyledLogin = styled.main`
	align-content: center;
	background-color: var(--color-gray-50);
	display: grid;
	gap: 3.2rem;
	grid-template-columns: 48rem;
	justify-content: center;
	min-height: 100vh;
`;

const Login = () => {
	return (
		<StyledLogin>
			<Logo />
			<Heading as="h4">Log in to your account</Heading>
			<LoginForm />
		</StyledLogin>
	);
};

export default Login;
