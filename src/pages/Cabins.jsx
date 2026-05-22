import AddCabin from "../features/cabins/AddCabin";
import CabinsTable from "../features/cabins/CabinsTable";
import CabinsTableOperations from "../features/cabins/CabinsTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Cabins = () => {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<CabinsTableOperations />
			</Row>

			<Row>
				<CabinsTable />
				<AddCabin />
			</Row>
		</>
	);
};

export default Cabins;
