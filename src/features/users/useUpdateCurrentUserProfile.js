import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUserProfile } from "./apiUsers";

const useUpdateCurrentUserProfile = () => {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateProfile } = useMutation({
		mutationFn: updateCurrentUserProfile,
		onSuccess: () => {
			toast.success("Profile successfully updated");

			queryClient.invalidateQueries({
				queryKey: ["profile"],
			});
		},
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, updateProfile };
};

export { useUpdateCurrentUserProfile };
