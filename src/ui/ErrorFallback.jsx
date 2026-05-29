import styled from "styled-components";

import GlobalStyles from "../styles/GlobalStyles";
import Heading from "./Heading";
import Button from "./Button";

const StyledErrorFallback = styled.main`
	align-items: center;
	background-color: var(--color-gray-50);
	display: flex;
	height: 100vh;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	flex: 0 1 96rem;
	text-align: center;
	padding: 4.8rem;

	& h1 {
		margin-bottom: 1.6rem;
	}

	& p {
		color: var(--color-gray-500);
		font-family: "Sono";
		margin-bottom: 3.2rem;
	}
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<>
			<GlobalStyles />
			<StyledErrorFallback>
				<Box>
					<Heading as="h1">Something went wrong</Heading>
					<p>{error.message}</p>
					<Button $size="large" onClick={resetErrorBoundary}>
						Try again
					</Button>
				</Box>
			</StyledErrorFallback>
		</>
	);
};

export default ErrorFallback;
