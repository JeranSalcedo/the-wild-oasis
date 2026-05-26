import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logout as logoutAPI } from "../../services/apiAuth";

const useLogout = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading, mutate: logout } = useMutation({
		mutationFn: logoutAPI,
		onSuccess: () => {
			toast.success("Successfully logged out");
			queryClient.removeQueries();

			navigate("/login", { replace: true });
		},
		onError: (error) => toast.error(error.message),
	});

	return { isLoading, logout };
};

export { useLogout };
