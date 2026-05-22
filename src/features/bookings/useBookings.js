import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";

const fields = {
	date: "date_start",
	price: "price_total",
};

const useBookings = () => {
	const [searchParams] = useSearchParams();
	const activeFilter = searchParams.get("status");
	const activeSort = searchParams.get("sort") ?? "date-dsc";
	const [field, order] = activeSort.split("-");

	const filter = ["checked-out", "checked-in", "unconfirmed"].includes(
		activeFilter,
	)
		? { field: "status", value: activeFilter }
		: null;

	const sort = ["date", "price"].includes(field)
		? { field: fields[field], asc: order === "asc" }
		: null;

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sort],
		queryFn: () => getBookings({ filter, sort }),
	});

	return { isLoading, bookings, error };
};

export { useBookings };
