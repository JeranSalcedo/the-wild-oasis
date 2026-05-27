import { useQuery } from "@tanstack/react-query";

import { getCurrentUserProfile } from "../../services/apiUsers";

const useCurrentUserProfile = () => {
	const { isLoading, data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: getCurrentUserProfile,
	});

	return { isLoading, profile };
};

export { useCurrentUserProfile };
