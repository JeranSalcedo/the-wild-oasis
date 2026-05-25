import { useEffect, useState } from "react";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useBooking } from "../bookings/useBooking";
import { useCheckIn } from "./useCheckIn";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TextButton from "../../ui/TextButton";
import BookingDataBox from "../bookings/BookingDataBox";

const Box = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

const StayDetails = () => {
	const { isLoading: isLoadingBookings, booking } = useBooking();
	const { isLoading: isLoadingSettings, settings } = useSettings();
	const { isUpdating, checkIn } = useCheckIn();
	const isLoading = isLoadingBookings || isLoadingSettings;

	const moveBack = useMoveBack();

	const [addBreakfast, setAddBreakfast] = useState(false);
	const [confirmPaid, setConfirmPaid] = useState(false);

	useEffect(
		() => setAddBreakfast(booking?.breakfast_included ?? false),
		[booking?.breakfast_included],
	);
	useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking?.paid]);

	if (isLoading) return <Spinner />;

	const {
		id,
		nights_count: nightsCount,
		guests_count: guestsCount,
		price_total: priceTotal,
		breakfast_included: breakfastIncluded,
		paid,
		guests: { full_name: guestName },
	} = booking;

	const priceBreakfast = settings.price_breakfast * nightsCount * guestsCount;
	const disableConfirm = paid && (breakfastIncluded || !addBreakfast);

	const handleAddBreakfast = () => {
		setAddBreakfast((addBreakfast) => !addBreakfast);

		if (paid) setConfirmPaid(!disableConfirm);
	};

	const handleCheckIn = () => {
		if (!confirmPaid) return;

		const data =
			!breakfastIncluded && addBreakfast
				? {
						price_extras: priceBreakfast,
						price_total: priceTotal + priceBreakfast,
						breakfast_included: true,
					}
				: {};

		checkIn({ id, data });
	};

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{id}</Heading>
				<TextButton onClick={moveBack}>&larr; Back</TextButton>
			</Row>

			<BookingDataBox booking={booking} />

			{!breakfastIncluded && (
				<Box>
					<Checkbox
						id="breakfast"
						checked={addBreakfast}
						onChange={handleAddBreakfast}
						disabled={breakfastIncluded || isUpdating}
					>
						Would you like to add breakfast for{" "}
						{formatCurrency(priceBreakfast)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					id="confirm"
					checked={confirmPaid}
					onChange={() =>
						setConfirmPaid((confirmPaid) => !confirmPaid)
					}
					disabled={disableConfirm || isUpdating}
				>
					I confirm that {guestName} has paid the total amount of{" "}
					{addBreakfast
						? `${formatCurrency(priceTotal + priceBreakfast)} (${formatCurrency(priceTotal)} + ${formatCurrency(priceBreakfast)})`
						: formatCurrency(priceTotal)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckIn}
					disabled={!confirmPaid || isUpdating}
				>
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
