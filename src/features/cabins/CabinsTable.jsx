import styled from "styled-components";

import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: 7px;
	font-size: 1.4rem;
	overflow: hidden;
`;

const TableHeader = styled.header`
	align-items: center;
	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	color: var(--color-grey-600);
	column-gap: 2.4rem;
	display: grid;
	font-weight: 600;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	letter-spacing: 0.4px;
	padding: 1.6rem 2.4rem;
	text-transform: uppercase;
`;

const CabinsTable = () => {
	const { isLoading, cabins } = useCabins();

	if (isLoading) return <Spinner />;

	return (
		<Table role="table">
			<TableHeader role="row">
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>
			{cabins.map((cabin) => (
				<CabinRow key={cabin.id} cabin={cabin} />
			))}
		</Table>
	);
};

export default CabinsTable;
