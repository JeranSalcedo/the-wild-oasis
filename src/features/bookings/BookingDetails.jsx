import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";

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
	const booking = {
		id: 22,
		created_at: "2026-05-15T07:13:37.691+00:00",
		status: "unconfirmed",
		date_start: "2026-07-01T00:00:00",
		date_end: "2026-07-11T00:00:00",
		nights_count: 10,
		guests_count: 7,
		price_total: 6050,
		guests: {
			full_name: "Nina Williams",
			email: "nina@hotmail.com",
			national_id: "2345678901",
			nationality: "South Africa",
			country_flag: "https://flagcdn.com/za.svg",
		},
		cabins: { name: "007" },
	};
	const isLoading = false;

	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #X</Heading>
					<Tag type={statusColor[booking.status]}>
						{booking.status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<TextButton onClick={moveBack}>&larr; Back</TextButton>
			</Row>

			<ButtonGroup>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default BookingDetails;
