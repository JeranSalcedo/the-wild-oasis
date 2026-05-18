import styled from "styled-components";

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
	return <StyledLogin>Login</StyledLogin>;
};

export default Login;
