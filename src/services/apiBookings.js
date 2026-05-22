import { supabase } from "./supabase";

const getBookings = async () => {
	const { data, error } = await supabase.from("bookings").select();

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
