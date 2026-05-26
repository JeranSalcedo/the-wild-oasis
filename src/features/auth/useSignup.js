import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupAPI } from "../../services/apiAuth";

const useSignup = () => {
	const { isLoading, mutate: signup } = useMutation({
		mutationFn: signupAPI,
		onSuccess: ({ profile: { name } }) => {
			toast.success(
				`Successfully registered ${name}. Please verify through the registered email.`,
			);
		},
		onError: (error) => toast.error(error.message),
	});

	return { isLoading, signup };
};

export { useSignup };
