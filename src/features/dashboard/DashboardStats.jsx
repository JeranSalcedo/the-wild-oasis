import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";

import DashboardStat from "./DashboardStat";

const DashboardStats = ({ bookings, confirmedStays, cabinsCount, period }) => {
	const bookingsCount = bookings.length;
	const sales = bookings.reduce(
		(total, booking) => total + booking.price_total,
		0,
	);
	const stays = confirmedStays.length;
	const occupiedNights = confirmedStays.reduce(
		(total, stay) => total + stay.nights_count,
		0,
	);
	const availableNights = cabinsCount * period;
	const occupancyRate = `${Math.round((100 * occupiedNights) / availableNights)}%`;

	return (
		<>
			<DashboardStat
				icon={<HiOutlineBriefcase />}
				title="Bookings"
				value={bookingsCount}
				color="blue"
			/>
			<DashboardStat
				icon={<HiOutlineBanknotes />}
				title="Sales"
				value={formatCurrency(sales)}
				color="green"
			/>
			<DashboardStat
				icon={<HiOutlineCalendarDays />}
				title="Stays"
				value={stays}
				color="indigo"
			/>
			<DashboardStat
				icon={<HiOutlineChartBar />}
				title="Occupancy rate"
				value={occupancyRate}
				color="yellow"
			/>
		</>
	);
};

export default DashboardStats;
