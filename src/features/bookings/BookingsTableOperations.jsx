import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Sort from "../../ui/Sort";

const BookingsTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				field="status"
				options={[
					{ label: "Checked out", value: "checked-out" },
					{ label: "Checked in", value: "checked-in" },
					{ label: "Unconfirmed", value: "unconfirmed" },
				]}
			/>

			<Sort
				options={[
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
				]}
			/>
		</TableOperations>
	);
};

export default BookingsTableOperations;
