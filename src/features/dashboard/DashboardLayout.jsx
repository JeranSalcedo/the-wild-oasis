import styled from "styled-components";

import { useDashboardFilters } from "./useDashboardFilters";
import { useRecentBookings } from "./useRecentBookings";
import { useCabins } from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";

import DashboardActivities from "./DashboardActivities";
import DashboardDurationsChart from "./DashboardDurationsChart";
import DashboardSalesChart from "./DashboardSalesChart";
import DashboardStats from "./DashboardStats";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
	display: grid;
	gap: 2.4rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
`;

const DashboardLayout = () => {
	const { period } = useDashboardFilters();
	const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
	const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
	const { isLoading: isLoadingCabins, cabins } = useCabins();
	const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins;

	if (isLoading) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<DashboardStats
				bookings={bookings}
				confirmedStays={confirmedStays}
				cabinsCount={cabins.length}
				period={period}
			/>
			<DashboardActivities />
			<DashboardDurationsChart confirmedStays={confirmedStays} />
			<DashboardSalesChart bookings={bookings} period={period} />
		</StyledDashboardLayout>
	);
};

export default DashboardLayout;
