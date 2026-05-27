import { useSearchParams } from "react-router-dom";

import { DEFAULT_CABINS_FILTERS } from "./cabinsConstants";

const { field, value, sortBy } = DEFAULT_CABINS_FILTERS;

const sortFields = {
	name: "name",
	capacity: "max_capacity",
	price: "base_price",
};

const useCabinsFilters = () => {
	const [searchParams] = useSearchParams();

	const filter = searchParams.get(field) ?? value;
	const sort = searchParams.get("sort") ?? sortBy;
	const [sortField, sortDirection] = sort.split("-");

	return {
		filter,
		sortField: sortFields[sortField],
		isAscending: sortDirection === "asc",
	};
};

export { useCabinsFilters };
