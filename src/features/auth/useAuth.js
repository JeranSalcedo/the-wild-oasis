import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../../services/apiAuth";

const useAuth = () => {
	const {
		isLoading,
		data: user,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return {
		isLoading,
		isAuthenticated: !!user,
		error,
	};
};

export { useAuth };
