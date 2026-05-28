export const DEFAULT_DASHBOARD_FILTERS = {
	field: "period",
	value: "7",
};

export const DASHBOARD_FILTER_OPTIONS = [
	{ label: "Last 7 days", value: "7" },
	{ label: "Last 30 days", value: "30" },
	{ label: "Last 90 days", value: "90" },
];

export const STAY_DURATION_BUCKETS = [
	{
		label: "1 night",
		max: 1,
	},
	{
		label: "2 nights",
		max: 2,
	},
	{
		label: "3 nights",
		max: 3,
	},
	{
		label: "4-5 nights",
		max: 5,
	},
	{
		label: "6-7 nights",
		max: 7,
	},
	{
		label: "8-14 nights",
		max: 14,
	},
	{
		label: "15-21 nights",
		max: 21,
	},
	{
		label: "21+ nights",
		max: Infinity,
	},
];

export const CHART_COLORS = {
	light: {
		background: "#fff",
		text: "#374151",
		lineChart: {
			salesExtras: {
				stroke: "#16a34a",
				fill: "#dcfce7",
			},

			salesTotal: {
				stroke: "#4f46e5",
				fill: "#c7d2fe",
			},
		},
		pieChart: [
			"#ef4444",
			"#f97316",
			"#eab308",
			"#84cc16",
			"#22c55e",
			"#14b8a6",
			"#3b82f6",
			"#a855f7",
		],
	},

	dark: {
		background: "#18212f",
		text: "#e5e7eb",
		lineChart: {
			salesExtras: {
				stroke: "#22c55e",
				fill: "#22c55e",
			},

			salesTotal: {
				stroke: "#4f46e5",
				fill: "#4f46e5",
			},
		},
		pieChart: [
			"#b91c1c",
			"#c2410c",
			"#a16207",
			"#4d7c0f",
			"#15803d",
			"#0f766e",
			"#1d4ed8",
			"#7e22ce",
		],
	},
};
