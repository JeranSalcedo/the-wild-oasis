import { supabase } from "./supabase";

const getBookings = async () => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_total, cabins(name), guests(full_name, email)",
		);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return data;
};

const getBooking = async (id) => {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, cabins(*), guests(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
};

export { getBookings, getBooking };
