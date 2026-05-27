import { useQuery } from "@tanstack/react-query";

import { getRecentStays } from "../../services/apiBookings";
import { useDashboardFilters } from "./useDashboardFilters";

const ACTIVE_STAY_STATUSES = ["checked-in", "checked-out"];

const useRecentStays = () => {
	const { period } = useDashboardFilters();

	const { isLoading, data: stays } = useQuery({
		queryKey: ["stays", "recent", period],
		queryFn: () => getRecentStays({ period }),
	});

	const confirmedStays = stays?.filter((stay) =>
		ACTIVE_STAY_STATUSES.includes(stay.status),
	);

	return { isLoading, stays, confirmedStays };
};

export { useRecentStays };
