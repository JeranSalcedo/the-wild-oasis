import { useCabins } from "./useCabins";
import { useCabinsFilters } from "./useCabinsFilters";

import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const filters = {
	"no-discount": (cabin) => !(cabin.discount > 0),
	"with-discount": (cabin) => cabin.discount > 0,
};

const CabinsTable = () => {
	const { isLoading, cabins } = useCabins();
	const { filter, sortField, isAscending } = useCabinsFilters();

	if (isLoading) return <Spinner />;

	const filteredCabins = filters[filter]
		? cabins.filter(filters[filter])
		: cabins;

	const sortedCabins = [...filteredCabins];
	sortedCabins.sort((a, b) =>
		isAscending ? a[sortField] - b[sortField] : b[sortField] - a[sortField],
	);

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
