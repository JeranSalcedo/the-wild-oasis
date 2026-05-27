import { useQuery } from "@tanstack/react-query";

import { getCabins } from "./apiCabins";

const useCabins = () => {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
};

export { useCabins };
