import styled from "styled-components";
import LogoutButton from "../features/auth/LogoutButton";

const StyledHeader = styled.header`
	background-color: var(--color-gray-0);
	border-bottom: 1px solid var(--color-gray-100);
	padding: 1.2rem 4.8rem;
`;

const Header = () => {
	return (
		<StyledHeader>
			<LogoutButton />
		</StyledHeader>
	);
};

export default Header;
