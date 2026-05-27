import { useQuery } from "@tanstack/react-query";

import { getRecentBookings } from "../bookings/apiBookings";
import { useDashboardFilters } from "./useDashboardFilters";

const useRecentBookings = () => {
	const { period } = useDashboardFilters();

	const { isLoading, data: bookings } = useQuery({
		queryKey: ["bookings", "recent", period],
		queryFn: () => getRecentBookings({ period }),
	});

	return { isLoading, bookings };
};

export { useRecentBookings };
