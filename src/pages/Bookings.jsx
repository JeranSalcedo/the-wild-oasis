import BookingsTable from "../features/bookings/BookingsTable";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Bookings = () => {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
				<BookingsTableOperations />
			</Row>

			<BookingsTable />
		</>
	);
};

export default Bookings;
