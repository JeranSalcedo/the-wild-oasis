import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";

import { CHART_COLORS, STAY_DURATION_BUCKETS } from "./dashboardConstants";

import { useTheme } from "../../context/ThemeContext";

import ChartLabel from "../../ui/ChartLabel";
import ChartTooltip from "../../ui/ChartTooltip";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const ChartBox = styled(DashboardBox)`
	display: block;
	padding: 2.4rem 3.2rem;
	gap: normal;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const prepareData = (initialData, stays) => {
	const durationLabel = (nights) =>
		STAY_DURATION_BUCKETS.find((bucket) => nights <= bucket.max).label;

	const counts = stays.reduce((acc, stay) => {
		const label = durationLabel(stay.nights_count);

		acc[label] = (acc[label] ?? 0) + 1;

		return acc;
	}, {});

	const data = initialData.map((item) => ({
		...item,
		value: counts[item.duration] ?? 0,
	}));

	return data;
};

const DashboardDurationsChart = ({ confirmedStays }) => {
	const { isDarkMode } = useTheme();
	const theme = isDarkMode ? "dark" : "light";

	const { pieChart } = CHART_COLORS[theme];
	const initialData = STAY_DURATION_BUCKETS.map((duration, index) => ({
		duration: duration.label,
		value: 0,
		color: pieChart[index],
	}));

	const data = prepareData(initialData, confirmedStays);

	return (
		<ChartBox>
			<Heading as="h2">Stay durations summary</Heading>
			<ResponsiveContainer height={240} width="100%">
				<PieChart>
					<Tooltip content={<ChartTooltip />} />
					<Pie
						data={data}
						nameKey="duration"
						dataKey="value"
						innerRadius={75}
						outerRadius={110}
						paddingAngle={3}
						label={<ChartLabel />}
						labelLine={false}
					>
						{data.map((item) => (
							<Cell
								key={item.duration}
								fill={item.color}
								stroke={item.color}
								total="test"
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
};

export default DashboardDurationsChart;
