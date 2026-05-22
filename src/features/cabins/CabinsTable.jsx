import { useSearchParams } from "react-router-dom";

import { useCabins } from "./useCabins";

import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const filters = {
	"no-discount": (cabin) => !(cabin.discount > 0),
	"with-discount": (cabin) => cabin.discount > 0,
};

const fields = {
	name: "name",
	capacity: "max_capacity",
	price: "base_price",
};

const CabinsTable = () => {
	const [searchParams] = useSearchParams();
	const activeFilter = searchParams.get("discount");
	const sort = searchParams.get("sort") ?? "name-asc";
	const [field, order] = sort.split("-");

	const { isLoading, cabins } = useCabins();

	if (isLoading) return <Spinner />;

	const filteredCabins = filters[activeFilter]
		? cabins.filter(filters[activeFilter])
		: cabins;

	const key = fields[field] ?? "created_at";
	const sortedCabins = [...filteredCabins];
	if (key) {
		sortedCabins.sort((a, b) =>
			order === "asc" ? a[key] - b[key] : b[key] - a[key],
		);
	}

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow key={cabin.id} cabin={cabin} />
					)}
				/>
			</Table>
		</Menus>
	);
};

export default CabinsTable;
