import {
	BOOKINGS_FILTER_OPTIONS,
	BOOKINGS_SORT_OPTIONS,
} from "./bookingsConstants";

import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Sort from "../../ui/Sort";

const BookingsTableOperations = () => {
	return (
		<TableOperations>
			<Filter field="status" options={BOOKINGS_FILTER_OPTIONS} />

			<Sort options={BOOKINGS_SORT_OPTIONS} />
		</TableOperations>
	);
};

export default BookingsTableOperations;
