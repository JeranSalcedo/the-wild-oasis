import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

import CabinForm from "./CabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

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
		<Table.Row>
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
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={id} />
						<Menus.List id={id}>
							<Menus.Button
								icon={<HiSquare2Stack />}
								onClick={handleDuplicate}
							>
								Duplicate
							</Menus.Button>

							<Modal.Open window="edit-cabin-form">
								<Menus.Button icon={<HiPencil />}>
									Edit
								</Menus.Button>
							</Modal.Open>

							<Modal.Open window="delete-cabin-confirm">
								<Menus.Button icon={<HiTrash />}>
									Delete
								</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit-cabin-form">
							<CabinForm cabin={cabin} />
						</Modal.Window>

						<Modal.Window name="delete-cabin-confirm">
							<ConfirmDelete
								name={name}
								onConfirm={() => deleteCabin({ id })}
								disabled={isLoading}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
};

export default CabinRow;
