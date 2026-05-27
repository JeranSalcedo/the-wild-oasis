import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

const useCheckIn = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading: isUpdating, mutate: checkIn } = useMutation({
		mutationFn: ({ id, data }) =>
			updateBooking({
				id,
				booking: {
					...data,
					status: "checked-in",
					paid: true,
				},
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);

			queryClient.invalidateQueries({
				active: true,
			});

			navigate("/");
		},
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, checkIn };
};

export { useCheckIn };
