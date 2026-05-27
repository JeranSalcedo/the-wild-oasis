import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCabin as updateCabinAPI } from "./apiCabins";

const useUpdateCabin = () => {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
		mutationFn: updateCabinAPI,
		onSuccess: () => {
			toast.success("Cabin successfully edited");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, updateCabin };
};

export { useUpdateCabin };
