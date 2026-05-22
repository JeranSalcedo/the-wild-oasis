import { format, isToday } from "date-fns";
import styled from "styled-components";

import { formatCurrency, formatDateFromNow } from "../../utils/helpers";

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
		status,
		date_start: dateStart,
		date_end: dateEnd,
		nights_count: nightsCount,
		price_total: priceTotal,
		guests: { full_name: guestName, email },
		cabins: { name: cabin },
	},
}) => {
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
		</Table.Row>
	);
};

export default BookingRow;
