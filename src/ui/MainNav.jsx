import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
	HiOutlineHomeModern,
	HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		align-items: center;
		display: flex;
		gap: 1.2rem;

		color: var(--color-gray-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		background-color: var(--color-gray-50);
		border-radius: var(--border-radius-sm);
		color: var(--color-gray-800);
	}

	& svg {
		color: var(--color-gray-400);
		height: 2.4rem;
		width: 2.4rem;
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

const MainNav = () => {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to="/dashboard">
						<HiOutlineHome />
						<span>Home</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/bookings">
						<HiOutlineCalendarDays />
						<span>Bookings</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/cabins">
						<HiOutlineHomeModern />
						<span>Cabins</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/users">
						<HiOutlineUsers />
						<span>Users</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to="/settings">
						<HiOutlineCog6Tooth />
						<span>Settings</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
};

export default MainNav;
