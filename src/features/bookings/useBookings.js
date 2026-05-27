import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PAGE_SIZE } from "../../utils/constants";

import { getBookings } from "./apiBookings";
import { useBookingsFilters } from "./useBookingsFilters";

const useBookings = () => {
	const queryClient = useQueryClient();

	const { filter, sort, page } = useBookingsFilters();

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sort, page],
		queryFn: () => getBookings({ filter, sort, page }),
	});

	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, page + 1],
			queryFn: () => getBookings({ filter, sort, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sort, page - 1],
			queryFn: () => getBookings({ filter, sort, page: page - 1 }),
		});

	return { isLoading, bookings, count, error };
};

export { useBookings };
