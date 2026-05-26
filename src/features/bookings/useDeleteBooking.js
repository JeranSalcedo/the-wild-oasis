import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingAPI,
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully deleted`);

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { isDeleting, deleteBooking };
};

export { useDeleteBooking };
