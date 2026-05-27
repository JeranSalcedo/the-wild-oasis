export const DEFAULT_CABINS_FILTERS = {
	field: "discount",
	value: "all",
	sortBy: "name-asc",
};

export const CABINS_FILTER_OPTIONS = [
	{ label: "No discount", value: "no-discount" },
	{ label: "With discount", value: "with-discount" },
];

export const CABINS_SORT_OPTIONS = [
	{ label: "Sort by name (A-Z)", value: "name-asc" },
	{ label: "Sort by name (Z-A)", value: "name-dsc" },
	{
		label: "Sort by capacity (low first)",
		value: "capacity-asc",
	},
	{
		label: "Sort by capacity (high first)",
		value: "capacity-dsc",
	},
	{ label: "Sort by price (low first)", value: "price-asc" },
	{ label: "Sort by price (high first)", value: "price-dsc" },
];
