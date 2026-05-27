import { useSearchParams } from "react-router-dom";

import {
	BOOKINGS_FILTER_OPTIONS,
	BOOKINGS_SORT_FIELDS,
	DEFAULT_BOOKINGS_FILTERS,
} from "./bookingsConstants";

const { field, value, sortBy } = DEFAULT_BOOKINGS_FILTERS;

const sortFields = {
	date: "date_start",
	price: "price_total",
};

const useBookingsFilters = () => {
	const [searchParams] = useSearchParams();

	const fieldValue = searchParams.get(field) ?? value;
	const filter = BOOKINGS_FILTER_OPTIONS.map(
		(option) => option.value,
	).includes(fieldValue)
		? { field: field, value: fieldValue }
		: null;

	const sortRaw = searchParams.get("sort") ?? sortBy;
	const [sortField, sortDirection] = sortRaw.split("-");
	const sort = BOOKINGS_SORT_FIELDS.includes(sortField)
		? { field: sortFields[sortField], asc: sortDirection === "asc" }
		: null;

	const page = searchParams.has("page")
		? Number(searchParams.get("page"))
		: 1;

	return {
		filter,
		sort,
		page,
	};
};

export { useBookingsFilters };
