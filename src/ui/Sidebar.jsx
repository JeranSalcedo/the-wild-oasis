import styled from "styled-components";

import { useCurrentUserProfile } from "../features/users/useCurrentUserProfile";
import Uploader from "../data/Uploader";

import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
	background-color: var(--color-gray-0);
	border-right: 1px solid var(--color-gray-100);
	padding: 3.2rem 2.4rem;

	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	grid-row: 1 / -1;
`;

const Sidebar = () => {
	const { isLoading, profile: { role } = {} } = useCurrentUserProfile();

	return (
		<StyledSidebar>
			<Logo />
			<MainNav />

			{!isLoading && role === "admin" && <Uploader />}
		</StyledSidebar>
	);
};

export default Sidebar;
