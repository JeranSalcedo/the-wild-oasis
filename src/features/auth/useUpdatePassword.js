import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updatePassword as updatePasswordAPI } from "./apiAuth";

const useUpdatePassword = () => {
	const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
		mutationFn: updatePasswordAPI,
		onSuccess: () => toast.success("Password successfully updated"),
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, updatePassword };
};

export { useUpdatePassword };
