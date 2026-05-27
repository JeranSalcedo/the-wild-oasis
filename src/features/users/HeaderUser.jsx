import styled from "styled-components";

import { useCurrentUserProfile } from "./useCurrentUserProfile";

import SpinnerMini from "../../ui/SpinnerMini";

const StyledHeaderUser = styled.div`
	align-items: center;
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	color: var(--color-gray-600);
	display: flex;
	font-weight: 500;
	font-size: 1.4rem;
	gap: 1.2rem;
	height: 4rem;
	padding: 0.6rem;
	transition: all 0.2s;
	width: 18rem;

	&:hover {
		background-color: var(--color-gray-100);
		color: var(--color-brand-700);
	}
`;

const Avatar = styled.img`
	aspect-ratio: 1;
	border-radius: 50%;
	display: block;
	height: 3.6rem;
	object-fit: cover;
	object-position: center;
	outline: 2px solid var(--color-gray-100);
	width: 4rem;
`;

const HeaderUser = () => {
	const { isLoading, profile: { name, avatar_url: avatarURL } = {} } =
		useCurrentUserProfile();

	return (
		<StyledHeaderUser>
			{isLoading ? (
				<SpinnerMini />
			) : (
				<>
					<Avatar
						src={avatarURL || "default-user.jpg"}
						alt={`Avatar of ${name}`}
					/>
					<span>{name}</span>
				</>
			)}
		</StyledHeaderUser>
	);
};

export default HeaderUser;
