import { useSearchParams } from "react-router-dom";

import { DEFAULT_DASHBOARD_FILTERS } from "./dashboardConstants";

const { field, value } = DEFAULT_DASHBOARD_FILTERS;

const useDashboardFilters = () => {
	const [searchParams] = useSearchParams();

	const period = searchParams.get(field) ?? value;

	return { period };
};

export { useDashboardFilters };
