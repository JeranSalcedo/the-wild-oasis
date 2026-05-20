import { useState } from "react";

import Button from "../ui/Button";
import CabinsTable from "../features/cabins/CabinsTable";
import CabinForm from "../features/cabins/CabinForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Cabins = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row>
				<CabinsTable />

				<Button onClick={() => setVisible((visible) => !visible)}>
					Add new cabin
				</Button>
				{visible && <CabinForm />}
			</Row>
		</>
	);
};

export default Cabins;
