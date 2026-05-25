import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

const fields = {
	date: "date_start",
	price: "price_total",
};

const useBookings = () => {
	const queryClient = useQueryClient();

	const [searchParams] = useSearchParams();

	const activeFilter = searchParams.get("status");
	const filter = ["checked-out", "checked-in", "unconfirmed"].includes(
		activeFilter,
	)
		? { field: "status", value: activeFilter }
		: null;

	const activeSort = searchParams.get("sort") ?? "date-dsc";
	const [field, order] = activeSort.split("-");
	const sort = ["date", "price"].includes(field)
		? { field: fields[field], asc: order === "asc" }
		: null;

	const page = searchParams.has("page")
		? Number(searchParams.get("page"))
		: 1;

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
