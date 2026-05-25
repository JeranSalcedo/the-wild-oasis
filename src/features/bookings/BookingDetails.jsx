import styled from "styled-components";

import { useBooking } from "./useBooking";
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

	const moveBack = useMoveBack();

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
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default BookingDetails;
