import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "./apiAuth";

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
		user,
		isAuthenticated: !!user,
		error,
	};
};

export { useAuth };
