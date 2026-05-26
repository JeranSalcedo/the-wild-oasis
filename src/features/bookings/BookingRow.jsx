import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import styled from "styled-components";

import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from "react-icons/hi2";

import { formatCurrency, formatDateFromNow } from "../../utils/helpers";
import { useCheckOut } from "../stays/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

const Cabin = styled.div`
	color: var(--color-gray-600);
	font-family: "Sono";
	font-size: 1.6rem;
	font-weight: 600;
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-gray-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const statusColor = {
	unconfirmed: "blue",
	"checked-in": "green",
	"checked-out": "silver",
};

const BookingRow = ({
	booking: {
		id,
		status,
		date_start: dateStart,
		date_end: dateEnd,
		nights_count: nightsCount,
		price_total: priceTotal,
		guests: { full_name: guestName, email },
		cabins: { name: cabin },
	},
}) => {
	const { isUpdating, checkOut } = useCheckOut();
	const { isDeleting, deleteBooking } = useDeleteBooking();

	const navigate = useNavigate();

	const isLoading = isUpdating || isDeleting;

	return (
		<Table.Row>
			<Cabin>{cabin}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(dateStart))
						? "Today"
						: formatDateFromNow(dateStart)}{" "}
					&rarr; {nightsCount} night stay
				</span>
				<span>
					{format(new Date(dateStart), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(dateEnd), "MMM dd yyyy")}
				</span>
			</Stacked>

			<Tag type={statusColor[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(priceTotal)}</Amount>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={id} />
					<Menus.List id={id}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${id}`)}
						>
							See details
						</Menus.Button>

						{status === "unconfirmed" && (
							<Menus.Button
								icon={<HiArrowDownOnSquare />}
								onClick={() => navigate(`/stays/${id}`)}
							>
								Check in
							</Menus.Button>
						)}

						{status === "checked-in" && (
							<Menus.Button
								icon={<HiArrowUpOnSquare />}
								onClick={() => checkOut(id)}
								disabled={isLoading}
							>
								Check out
							</Menus.Button>
						)}

						<Modal.Open window="delete-booking-confirm">
							<Menus.Button icon={<HiTrash />}>
								Delete
							</Menus.Button>
						</Modal.Open>
					</Menus.List>

					<Modal.Window name="delete-booking-confirm">
						<ConfirmDelete
							name={`Booking #${id}`}
							onConfirm={() => deleteBooking(id)}
							disabled={isLoading}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
};

export default BookingRow;
