import { supabase } from "../../services/supabase";

import { PAGE_SIZE } from "../../utils/constants";

import { getDateRange } from "../../utils/helpers";

const getBookings = async ({ filter, sort, page }) => {
	let query = supabase
		.from("bookings")
		.select(
			"id, created_at, status, date_start, date_end, nights_count, guests_count, price_total, cabins(name), guests(full_name, email)",
			{ count: "exact" },
		);
	if (filter)
		query = query[filter.method ?? "eq"](filter.field, filter.value);
	if (sort) query = query.order(sort.field, { ascending: sort.asc });
	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;

		query = query.range(from, to);
	}

	const { data, count, error } = await query;

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return { data, count };
};

const getBooking = async ({ id }) => {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, cabins(name), guests(*)")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
};

const getOperationsByDate = async ({ start, end }) => {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, cabins(name), guests(*)")
		.or(
			`and(status.eq.unconfirmed,date_start.gte.${start},date_start.lt.${end}),and(status.eq.checked-in,date_end.gte.${start},date_end.lt.${end})`,
		)
		.order("created_at");

	if (error) {
		console.error(error);
		throw new Error("Operations could not be loaded");
	}

	return data;
};

const getRecentBookings = async ({ period }) => {
	const { startDate, endDate } = getDateRange(period);

	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, price_extras, price_total")
		.gte("created_at", startDate.toISOString())
		.lte("created_at", endDate.toISOString())
		.order("created_at", { ascending: false });

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return data;
};

const getRecentStays = async ({ period }) => {
	const { startDate, endDate } = getDateRange(period);

	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(full_name)")
		.gte("date_start", startDate.toISOString())
		.lte("date_start", endDate.toISOString())
		.order("date_start", { ascending: false });

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return data;
};

const updateBooking = async ({ id, booking }) => {
	const { data, error } = await supabase
		.from("bookings")
		.update(booking)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}

	return data;
};

const deleteBooking = async ({ id }) => {
	if (!id) {
		throw new Error("Missing id");
	}

	const { data, error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}

	return data;
};

export {
	getBookings,
	getBooking,
	getOperationsByDate,
	getRecentBookings,
	getRecentStays,
	updateBooking,
	deleteBooking,
};
