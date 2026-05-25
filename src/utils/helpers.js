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

const getScrollParent = (element) => {
	if (!element) return window;

	let parent = element.parentElement;

	while (parent) {
		const { overflow, overflowX, overflowY } = getComputedStyle(parent);

		const isScrollable = /(auto|scroll|overlay)/.test(
			overflow + overflowX + overflowY,
		);

		if (isScrollable) return parent;

		parent = parent.parentElement;
	}

	return window;
};

export { formatCurrency, formatDateFromNow, getScrollParent };
