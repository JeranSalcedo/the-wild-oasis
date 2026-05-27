import {
	DASHBOARD_FILTER_OPTIONS,
	DEFAULT_DASHBOARD_FILTERS,
} from "./dashboardConstants";

import Filter from "../../ui/Filter";

const DashboardFilter = () => {
	return (
		<Filter
			field={DEFAULT_DASHBOARD_FILTERS.field}
			alwaysActive={true}
			options={DASHBOARD_FILTER_OPTIONS}
		/>
	);
};

export default DashboardFilter;
