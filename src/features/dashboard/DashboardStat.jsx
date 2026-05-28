import styled from "styled-components";

const StyledDashboardStat = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	column-gap: 1.6rem;
	display: grid;
	grid-template-columns: 6.4rem 1fr;
	grid-template-rows: auto auto;
	padding: 1.6rem;
	row-gap: 0.4rem;
`;

const Icon = styled.div`
	align-items: center;
	aspect-ratio: 1;
	background-color: var(--color-${(props) => props.color}-100);
	border-radius: 50%;
	display: flex;
	grid-row: 1 / -1;
	justify-content: center;

	& svg {
		color: var(--color-${(props) => props.color}-700);
		height: 3.2rem;
		width: 3.2rem;
	}
`;

const Title = styled.h5`
	align-self: end;
	color: var(--color-gray-500);
	font-size: 1.2rem;
	font-weight: 600;
	letter-spacing: 0.4px;
	text-transform: uppercase;
`;

const Value = styled.p`
	font-size: 2.4rem;
	font-weight: 500;
	line-height: 1;
`;

const DashboardStat = ({ icon, title, value, color }) => {
	return (
		<StyledDashboardStat>
			<Icon color={color}>{icon}</Icon>
			<Title>{title}</Title>
			<Value>{value}</Value>
		</StyledDashboardStat>
	);
};

export default DashboardStat;
