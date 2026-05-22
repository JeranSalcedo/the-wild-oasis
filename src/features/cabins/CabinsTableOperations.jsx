import Filter from "../../ui/Filter";
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
		</TableOperations>
	);
};

export default CabinsTableOperations;
