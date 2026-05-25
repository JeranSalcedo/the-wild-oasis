import { format, isToday } from "date-fns";
import styled from "styled-components";

import {
	HiOutlineChatBubbleBottomCenterText,
	HiOutlineCheckCircle,
	HiOutlineCurrencyDollar,
	HiOutlineHomeModern,
} from "react-icons/hi2";

import { formatCurrency, formatDateFromNow } from "../../utils/helpers";

import DataItem from "../../ui/DataItem";
import Flag from "../../ui/Flag";

const StyledBookingDataBox = styled.section`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-md);
	overflow: hidden;
`;

const Header = styled.header`
	align-items: center;
	background-color: var(--color-brand-500);
	color: #e0e7ff;
	display: flex;
	font-size: 1.8rem;
	font-weight: 500;
	justify-content: space-between;
	padding: 2rem 4rem;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& div:first-child {
		align-items: center;
		display: flex;
		font-weight: 600;
		font-size: 1.8rem;
		gap: 1.6rem;
	}

	& span {
		font-family: "Sono";
		font-size: 2rem;
		margin-left: 4px;
	}
`;

const Section = styled.section`
	padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
	align-items: center;
	color: var(--color-gray-500);
	display: flex;
	gap: 1.2rem;
	margin-bottom: 1.6rem;

	& p:first-of-type {
		color: var(--color-gray-700);
		font-weight: 500;
	}
`;

const Price = styled.div`
	align-items: center;
	background-color: ${(props) =>
		props.$paid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
	border-radius: var(--border-radius-sm);
	color: ${(props) =>
		props.$paid ? "var(--color-green-700)" : "var(--color-yellow-700)"};
	display: flex;
	justify-content: space-between;
	margin-top: 2.4rem;
	padding: 1.6rem 3.2rem;

	svg {
		color: currentColor !important;
		height: 2.4rem;
		width: 2.4rem;
	}

	& p:last-child {
		font-size: 1.4rem;
		font-weight: 600;
		text-transform: uppercase;
	}
`;

const Footer = styled.footer`
	color: var(--color-gray-500);
	font-size: 1.2rem;
	padding: 1.6rem 4rem;
	text-align: right;
`;

const BookingDataBox = ({
	booking: {
		created_at,
		date_start: dateStart,
		date_end: dateEnd,
		nights_count: nightsCount,
		guests_count: guestsCount,
		price_cabin: priceCabin,
		price_extras: priceExtras,
		price_total: priceTotal,
		breakfast_included: breakfastIncluded,
		paid,
		observations,
		guests: {
			full_name: guestName,
			email,
			national_id: nationalID,
			nationality,
			country_flag: countryFlag,
		},
		cabins: { name: cabin },
	},
}) => {
	return (
		<StyledBookingDataBox>
			<Header>
				<div>
					<HiOutlineHomeModern />
					<p>
						{nightsCount} nights in Cabin <span>{cabin}</span>
					</p>
				</div>

				<p>
					{format(new Date(dateStart), "EEE, MMM dd yyyy")} (
					{isToday(new Date(dateStart))
						? "Today"
						: formatDateFromNow(dateStart)}
					) &mdash; {format(new Date(dateEnd), "EEE, MMM dd yyyy")}
				</p>
			</Header>

			<Section>
				<Guest>
					{countryFlag && (
						<Flag
							src={countryFlag}
							alt={`Flag of ${nationality}`}
						/>
					)}
					<p>
						{guestName}{" "}
						{guestsCount > 1 ? `+ ${guestsCount - 1} guests` : ""}
					</p>
					<span>&bull;</span>
					<p>{email}</p>
					<span>&bull;</span>
					<p>National ID {nationalID}</p>
				</Guest>

				{observations && (
					<DataItem
						icon={<HiOutlineChatBubbleBottomCenterText />}
						label="Observations"
					>
						{observations}
					</DataItem>
				)}

				<DataItem
					icon={<HiOutlineCheckCircle />}
					label="Breakfast included?"
				>
					{breakfastIncluded ? "Yes" : "No"}
				</DataItem>

				<Price $paid={paid}>
					<DataItem
						icon={<HiOutlineCurrencyDollar />}
						label="Total price"
					>
						{formatCurrency(priceTotal)}

						{breakfastIncluded &&
							` (${formatCurrency(priceCabin)} cabin + ${formatCurrency(priceExtras)} breakfast)`}
					</DataItem>

					<p>{paid ? "Paid" : "Will pay at property"}</p>
				</Price>
			</Section>

			<Footer>
				<p>
					Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
				</p>
			</Footer>
		</StyledBookingDataBox>
	);
};

export default BookingDataBox;
