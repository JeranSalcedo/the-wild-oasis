import {
	CABINS_FILTER_OPTIONS,
	CABINS_SORT_OPTIONS,
	DEFAULT_CABINS_FILTERS,
} from "./cabinsConstants";

import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

const CabinsTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				field={DEFAULT_CABINS_FILTERS.field}
				options={CABINS_FILTER_OPTIONS}
			/>
			<Sort options={CABINS_SORT_OPTIONS} />
		</TableOperations>
	);
};

export default CabinsTableOperations;
