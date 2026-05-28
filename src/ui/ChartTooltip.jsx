import styled from "styled-components";

import { formatCurrency } from "../utils/helpers";

const StyledChartTooltip = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-md);
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1.2rem 1.6rem;
`;

const Heading = styled.p`
	color: var(--color-gray-700);
	font-size: 1.4rem;
	font-weight: 600;
`;

const Row = styled.div`
	align-items: center;
	display: flex;
	font-size: 1.3rem;
	gap: 2rem;
	justify-content: space-between;
`;

const Label = styled.span`
	color: ${(props) => props.color};
	font-weight: 500;
`;

const Value = styled.span`
	color: var(--color-gray-700);
	font-weight: 600;
`;

const ChartTooltip = ({ active, payload, label }) => {
	if (!active || !payload || !payload.length) return null;

	const isPieChart = payload.length === 1 && payload[0]?.payload?.duration;

	return (
		<StyledChartTooltip>
			<Heading>{label || payload[0].name}</Heading>

			{!isPieChart &&
				payload.map((item) => (
					<Row key={item.dataKey}>
						<Label color={item.color}>{item.name}</Label>

						<Value>{formatCurrency(item.value)}</Value>
					</Row>
				))}

			{isPieChart && (
				<>
					<Row>
						<Label color={payload[0].payload.color}>Stays</Label>

						<Value>{payload[0].payload.value}</Value>
					</Row>
				</>
			)}
		</StyledChartTooltip>
	);
};

export default ChartTooltip;
