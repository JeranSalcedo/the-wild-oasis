import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiTrash,
} from "react-icons/hi2";

import { useBooking } from "./useBooking";
import { useCheckOut } from "../stays/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import TextButton from "../../ui/TextButton";

const HeadingGroup = styled.div`
	align-items: center;
	display: flex;
	gap: 2.4rem;
`;

const statusColor = {
	unconfirmed: "blue",
	"checked-in": "green",
	"checked-out": "silver",
};

const BookingDetails = () => {
	const { isLoading, booking } = useBooking();
	const { isUpdating, checkOut } = useCheckOut();
	const { isDeleting, deleteBooking } = useDeleteBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;
	if (!booking) return <span>No booking could be found</span>;

	const { id, status } = booking;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{id}</Heading>
					<Tag type={statusColor[status]}>
						{booking.status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<TextButton onClick={moveBack}>&larr; Back</TextButton>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Modal>
					<Modal.Open window="delete-booking-confirm">
						<Button $variation="danger">
							<HiTrash /> <span>Delete</span>
						</Button>
					</Modal.Open>

					<Modal.Window name="delete-booking-confirm">
						<ConfirmDelete
							name={`Booking #${id}`}
							onConfirm={() =>
								deleteBooking(
									{ id },
									{
										onSuccess: () => navigate(-1),
									},
								)
							}
							disabled={isUpdating || isDeleting}
						/>
					</Modal.Window>
				</Modal>

				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/stays/${id}`)}>
						<HiArrowDownOnSquare /> <span>Check in</span>
					</Button>
				)}

				{status === "checked-in" && (
					<Button
						onClick={() => checkOut(id)}
						disabled={isUpdating || isDeleting}
					>
						<HiArrowUpOnSquare /> <span>Check out</span>
					</Button>
				)}

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default BookingDetails;
