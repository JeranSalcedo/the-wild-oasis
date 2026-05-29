import { Link } from "react-router-dom";
import styled from "styled-components";

import { useCheckOut } from "../stays/useCheckOut";

import Button from "../../ui/Button";
import Flag from "../../ui/Flag";
import Tag from "../../ui/Tag";

const StyledDashboardActivity = styled.li`
	align-items: center;
	border-bottom: 1px solid var(--color-gray-100);
	display: grid;
	font-size: 1.4rem;
	gap: 1.2rem;
	grid-template-columns: 8rem 1.5rem 1fr 7rem 9rem;
	padding: 0.8rem 0;

	&:first-child {
		border-top: 1px solid var(--color-gray-100);
	}
`;

const Guest = styled.div`
	font-weight: 500;
`;

const DashboardActivity = ({
	stay: {
		id,
		status,
		nights_count: nightsCount,
		guests: {
			full_name: guestName,
			nationality,
			country_flag: countryFlag,
		},
	},
}) => {
	const { isUpdating, checkOut } = useCheckOut();

	const statusConfig = {
		unconfirmed: {
			tag: {
				color: "green",
				text: "Arriving",
			},
			button: {
				text: "Check in",
				as: Link,
				to: (id) => `/stays/${id}`,
			},
		},
		"checked-in": {
			tag: {
				color: "blue",
				text: "Departing",
			},
			button: {
				text: "Check out",
				onClick: (id) => checkOut(id),
				disabled: isUpdating,
			},
		},
	};

	const config = statusConfig[status];

	return (
		<StyledDashboardActivity>
			<Tag type={config.tag.color}>{config.tag.text}</Tag>
			<Flag src={countryFlag} alt={`Flag of ${nationality}`} />
			<Guest>{guestName}</Guest>
			<div>{nightsCount} nights</div>
			<Button
				$size="small"
				as={config.button.as}
				to={config.button.to?.(id)}
				onClick={() => config.button.onClick?.(id)}
				disabled={config.button.disabled ?? false}
			>
				{config.button.text}
			</Button>
		</StyledDashboardActivity>
	);
};

export default DashboardActivity;
