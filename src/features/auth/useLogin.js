import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";

const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { isLoading, mutate: login } = useMutation({
		mutationFn: loginAPI,
		onSuccess: (user) => {
			toast.success(`Welcome to The Wild Oasis`);
			queryClient.setQueryData(["user"], user);

			navigate("/", { replace: true });
		},
		onError: (error) => toast.error(error.message),
	});

	return { isLoading, login };
};

export { useLogin };
