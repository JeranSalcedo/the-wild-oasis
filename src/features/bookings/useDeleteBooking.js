import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingAPI,
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully deleted`);

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});

			navigate("/bookings");
		},
		onError: (error) => toast.error(error.message),
	});

	return { isDeleting, deleteBooking };
};

export { useDeleteBooking };
