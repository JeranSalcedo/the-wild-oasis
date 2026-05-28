import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { eachDayOfInterval, format } from "date-fns";
import styled from "styled-components";

import { CHART_COLORS } from "./dashboardConstants";

import { getDateRange } from "../../utils/helpers";
import { useTheme } from "../../context/ThemeContext";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledDashboardSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-gray-300);
	}
`;

const DashboardSalesChart = ({ bookings, period }) => {
	const { isDarkMode } = useTheme();
	const { startDate, endDate } = getDateRange(period);

	const dates = eachDayOfInterval({
		start: startDate,
		end: endDate,
	});

	const bookingsByDate = bookings.reduce((acc, booking) => {
		const key = format(new Date(booking.created_at), "yyyy-MM-dd");

		if (!acc[key]) {
			acc[key] = {
				salesExtras: 0,
				salesTotal: 0,
			};
		}

		acc[key].salesExtras += booking.price_extras;
		acc[key].salesTotal += booking.price_total;

		return acc;
	}, {});

	const data = dates.map((date) => {
		const key = format(date, "yyyy-MM-dd");

		return {
			label: format(date, "MMM dd"),
			salesExtras: bookingsByDate[key]?.salesExtras ?? 0,
			salesTotal: bookingsByDate[key]?.salesTotal ?? 0,
		};
	});

	const theme = isDarkMode ? "dark" : "light";
	const {
		background,
		text,
		lineChart: { salesExtras, salesTotal },
	} = CHART_COLORS[theme];

	return (
		<StyledDashboardSalesChart>
			<Heading as="h2">
				Sales for {format(startDate, "MMM dd yyyy")} &mdash;{" "}
				{format(endDate, "MMM dd yyyy")}
			</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: text }}
						tickLine={{ stroke: text }}
					/>
					<YAxis
						unit="$"
						tick={{ fill: text }}
						tickLine={{ stroke: text }}
					/>
					<CartesianGrid />
					<Tooltip contentStyle={{ backgroundColor: background }} />
					<Area
						dataKey="salesTotal"
						name="Total sales"
						type="monotone"
						unit="$"
						fill={salesTotal.fill}
						stroke={salesTotal.stroke}
						strokeWidth={2}
					/>
					<Area
						dataKey="salesExtras"
						name="Extras sales"
						type="monotone"
						unit="$"
						stroke={salesExtras.stroke}
						fill={salesExtras.fill}
						strokeWidth={2}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledDashboardSalesChart>
	);
};

export default DashboardSalesChart;
