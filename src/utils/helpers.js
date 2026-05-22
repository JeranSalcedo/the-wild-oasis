import { formatDistance, parseISO } from "date-fns";

const formatCurrency = (value) =>
	new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
		value,
	);

const formatDateFromNow = (date) =>
	formatDistance(parseISO(date), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");

export { formatCurrency, formatDateFromNow };
