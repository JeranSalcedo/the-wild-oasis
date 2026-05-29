import styled from "styled-components";

import { useTodayOperations } from "./useTodayOperations";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import DashboardActivity from "./DashboardActivity";

const StyledDashboardActivities = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding: 3.2rem;
	padding-top: 2.4rem;
`;

const Activities = styled.ul`
	overflow: scroll;
	overflow-x: hidden;

	&::-webkit-scrollbar {
		width: 0 !important;
	}

	scrollbar-width: none;
	-ms-overflow-style: none;
`;

const NoActivities = styled.p`
	font-size: 1.8rem;
	font-weight: 500;
	margin-top: 0.8rem;
	text-align: center;
`;

const DashboardActivities = () => {
	const { isLoading, stays } = useTodayOperations();

	return (
		<StyledDashboardActivities>
			<Row type="horizontal">
				<Heading as="h2">Today</Heading>
			</Row>
			{isLoading ? (
				<Spinner />
			) : stays.length === 0 ? (
				<NoActivities>No activity today</NoActivities>
			) : (
				<Activities>
					{stays.map((stay) => (
						<DashboardActivity key={stay.id} stay={stay} />
					))}
				</Activities>
			)}
		</StyledDashboardActivities>
	);
};

export default DashboardActivities;
