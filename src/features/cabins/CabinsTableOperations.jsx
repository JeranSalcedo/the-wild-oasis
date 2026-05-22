import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

const CabinsTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				field="discount"
				options={[
					{ label: "No discount", value: "no-discount" },
					{ label: "With discount", value: "with-discount" },
				]}
			/>
			<Sort
				options={[
					{ label: "Sort by name (A-Z)", value: "name-asc" },
					{ label: "Sort by name (Z-A)", value: "name-dsc" },
					{
						label: "Sort by capacity (low first)",
						value: "capacity-asc",
					},
					{
						label: "Sort by capacity (high first)",
						value: "capacity-dsc",
					},
					{ label: "Sort by price (low first)", value: "price-asc" },
					{ label: "Sort by price (high first)", value: "price-dsc" },
				]}
			/>
		</TableOperations>
	);
};

export default CabinsTableOperations;
