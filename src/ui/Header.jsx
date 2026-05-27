import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import ThemeToggle from "./ThemeToggle";

const StyledHeader = styled.header`
	align-items: center;
	background-color: var(--color-gray-0);
	border-bottom: 1px solid var(--color-gray-100);
	display: flex;
	gap: 2.4rem;
	justify-content: flex-end;
	padding: 1.2rem 4.8rem;
`;

const Header = () => {
	return (
		<StyledHeader>
			<HeaderMenu />
			<ThemeToggle />
		</StyledHeader>
	);
};

export default Header;
