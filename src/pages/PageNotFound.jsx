import styled from "styled-components";

import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
	align-items: center;
	background-color: var(--color-gray-50);
	display: flex;
	height: 100vh;
	justify-content: center;
	padding: 4.8rem;
`;

const Box = styled.div`
	/* Box */
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);

	flex: 0 1 96rem;
	padding: 4.8rem;
	text-align: center;

	& h1 {
		margin-bottom: 3.2rem;
	}
`;

const PageNotFound = () => {
	return (
		<StyledPageNotFound>
			<Box>
				<Heading as="h1">
					The page you are looking for could not be found
				</Heading>
				<Button $size="large">&larr; Go back</Button>
			</Box>
		</StyledPageNotFound>
	);
};

export default PageNotFound;
