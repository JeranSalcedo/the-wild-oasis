import { useState } from "react";
import {
	differenceInDays,
	isFuture,
	isPast,
	isToday,
	parseISO,
} from "date-fns";

import { supabase } from "../services/supabase";

import Button from "../ui/Button";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

const subtractDates = (date1, date2) =>
	differenceInDays(parseISO(String(date1)), parseISO(String(date2)));

const createCabins = async () => {
	const { error } = await supabase.from("cabins").insert(cabins);
	if (error) console.log(error.message);
};

const deleteCabins = async () => {
	const { error } = await supabase.from("cabins").delete().gt("id", 0);
	if (error) console.log(error.message);
};

const createGuests = async () => {
	const { error } = await supabase.from("guests").insert(guests);
	if (error) console.log(error.message);
};

const deleteGuests = async () => {
	const { error } = await supabase.from("guests").delete().gt("id", 0);
	if (error) console.log(error.message);
};

const createBookings = async () => {
	const { data: cabinsData } = await supabase
		.from("cabins")
		.select("id")
		.order("id");
	const cabinsIDs = cabinsData.map((cabin) => cabin.id);

	const { data: guestsData } = await supabase
		.from("guests")
		.select("id")
		.order("id");
	const guestsIDs = guestsData.map((guest) => guest.id);

	const bookingsData = bookings.map((booking) => {
		const date_start = new Date(booking.date_start);
		const date_end = new Date(booking.date_end);

		const status =
			isPast(date_end) && !isToday(date_end)
				? "checked-out"
				: isFuture(date_start) || isToday(date_start)
					? "unconfirmed"
					: "checked-in";

		const cabin = cabins.at(booking.cabin_id - 1);
		const nights_count = subtractDates(
			booking.date_end,
			booking.date_start,
		);

		const price_cabin = nights_count * (cabin.base_price - cabin.discount);
		const price_extras = booking.breakfast_included
			? nights_count * 15 * booking.guests_count
			: 0;
		const price_total = price_cabin + price_extras;

		return {
			...booking,
			status,
			nights_count,
			price_cabin,
			price_extras,
			price_total,
			cabin_id: cabinsIDs.at(booking.cabin_id - 1),
			guest_id: guestsIDs.at(booking.guest_id - 1),
		};
	});

	const { error } = await supabase.from("bookings").insert(bookingsData);
	if (error) console.log(error.message);
};

const deleteBookings = async () => {
	const { error } = await supabase.from("bookings").delete().gt("id", 0);
	if (error) console.log(error.message);
};

const Uploader = () => {
	const [isLoading, setIsLoading] = useState(false);

	const uploadAll = async () => {
		setIsLoading(true);

		await deleteBookings();
		await deleteGuests();
		await deleteCabins();

		await createCabins();
		await createGuests();
		await createBookings();

		setIsLoading(false);
	};

	const uploadBookings = async () => {
		setIsLoading(true);

		await deleteBookings();
		await createBookings();

		setIsLoading(false);
	};

	return (
		<div
			style={{
				backgroundColor: "#e0e7ff",
				borderRadius: "5px",
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				marginTop: "auto",
				padding: "8px",
				textAlign: "center",
			}}
		>
			<h3>SAMPLE DATA</h3>

			<Button onClick={uploadAll} disabled={isLoading}>
				Upload ALL
			</Button>

			<Button onClick={uploadBookings} disabled={isLoading}>
				Upload bookings ONLY
			</Button>
		</div>
	);
};

export default Uploader;
