import { useEffect, useState } from "react";
import styled from "styled-components";

import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TextButton from "../../ui/TextButton";
import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

const StayDetails = () => {
	const { isLoading, booking } = useBooking();

	const moveBack = useMoveBack();

	const [confirmPaid, setConfirmPaid] = useState(false);

	useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking?.paid]);

	if (isLoading) return <Spinner />;

	const {
		id,
		price_total: priceTotal,
		paid,
		guests: { full_name: guestName },
	} = booking;

	const handleCheckIn = () => {};

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{id}</Heading>
				<TextButton onClick={moveBack}>&larr; Back</TextButton>
			</Row>

			<BookingDataBox booking={booking} />

			<Box>
				<Checkbox
					id="confirm"
					checked={confirmPaid}
					onChange={() =>
						setConfirmPaid((confirmPaid) => !confirmPaid)
					}
					disabled={paid}
				>
					I confirm that {guestName} has paid the total amount of{" "}
					{formatCurrency(priceTotal)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckIn} disabled={!confirmPaid}>
					Check in booking #{id}
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default StayDetails;
