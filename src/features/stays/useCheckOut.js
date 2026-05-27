import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../bookings/apiBookings";

const useCheckOut = () => {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: checkOut } = useMutation({
		mutationFn: (id) =>
			updateBooking({
				id,
				booking: {
					status: "checked-out",
				},
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);

			queryClient.invalidateQueries({
				active: true,
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, checkOut };
};

export { useCheckOut };
