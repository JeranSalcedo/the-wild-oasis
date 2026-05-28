export const DEFAULT_DASHBOARD_FILTERS = {
	field: "period",
	value: "7",
};

export const DASHBOARD_FILTER_OPTIONS = [
	{ label: "Last 7 days", value: "7" },
	{ label: "Last 30 days", value: "30" },
	{ label: "Last 90 days", value: "90" },
];

export const DARK_CHART_COLORS = {
	salesExtras: { stroke: "#22c55e", fill: "#22c55e" },
	salesTotal: { stroke: "#4f46e5", fill: "#4f46e5" },
	text: "#e5e7eb",
	background: "#18212f",
};
export const LIGHT_CHART_COLORS = {
	salesExtras: { stroke: "#16a34a", fill: "#dcfce7" },
	salesTotal: { stroke: "#4f46e5", fill: "#c7d2fe" },
	text: "#374151",
	background: "#fff",
};
