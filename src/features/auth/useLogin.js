import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";

const useLogin = () => {
	const navigate = useNavigate();

	const { isLoading, mutate: login } = useMutation({
		mutationFn: loginAPI,
		onSuccess: () => {
			toast.success(`Welcome to The Wild Oasis`);

			navigate("/");
		},
		onError: (error) => toast.error(error.message),
	});

	return { isLoading, login };
};

export { useLogin };
