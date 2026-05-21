import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

import CabinForm from "./CabinForm";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-gray-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-gray-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
	const {
		id,
		name,
		description,
		image_url: imageURL,
		max_capacity: maxCapacity,
		base_price: basePrice,
		discount,
	} = cabin;

	const { isCreating, createCabin } = useCreateCabin();
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const isLoading = isCreating || isDeleting;

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${name}`,
			description,
			image: imageURL,
			maxCapacity,
			basePrice,
			discount,
		});
	};

	return (
		<TableRow role="row">
			<Img src={imageURL} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(basePrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}

			<div>
				<button onClick={handleDuplicate} disabled={isLoading}>
					<HiSquare2Stack />
				</button>

				<Modal>
					<Modal.Open window="edit-cabin-form">
						<button>
							<HiPencil />
						</button>
					</Modal.Open>
					<Modal.Window name="edit-cabin-form">
						<CabinForm cabin={cabin} />
					</Modal.Window>

					<button
						onClick={() => deleteCabin(id)}
						disabled={isLoading}
					>
						<HiTrash />
					</button>
				</Modal>
			</div>
		</TableRow>
	);
};

export default CabinRow;
