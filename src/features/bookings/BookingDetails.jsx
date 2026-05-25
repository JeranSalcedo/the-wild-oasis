import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useBooking } from "./useBooking";
import { useCheckOut } from "../stays/useCheckOut";
import { useMoveBack } from "../../hooks/useMoveBack";

import BookingDataBox from "./BookingDataBox";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Heading from "../../ui/Heading";
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

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;

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
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/stays/${id}`)}>
						Check in
					</Button>
				)}

				{status === "checked-in" && (
					<Button onClick={() => checkOut(id)} disabled={isUpdating}>
						<HiArrowUpOnSquare /> Check out
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
