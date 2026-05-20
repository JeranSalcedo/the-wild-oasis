import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinAPI,
		onSuccess: () => {
			toast.success("Cabin successfully deleted");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { isDeleting, deleteCabin };
};

export { useDeleteCabin };
