export const DEFAULT_BOOKINGS_FILTERS = {
	field: "status",
	value: "all",
	sortBy: "date-dsc",
};

export const BOOKINGS_FILTER_OPTIONS = [
	{ label: "Checked out", value: "checked-out" },
	{ label: "Checked in", value: "checked-in" },
	{ label: "Unconfirmed", value: "unconfirmed" },
];

export const BOOKINGS_SORT_OPTIONS = [
	{ label: "Sort by date (recent first)", value: "date-dsc" },
	{ label: "Sort by date (older first)", value: "date-asc" },
	{
		label: "Sort by total price (high first)",
		value: "price-dsc",
	},
	{
		label: "Sort by total price (low first)",
		value: "price-asc",
	},
];

export const BOOKINGS_SORT_FIELDS = ["date", "price"];
