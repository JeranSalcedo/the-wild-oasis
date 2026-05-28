import { useQuery } from "@tanstack/react-query";

import { getOperationsByDate } from "../bookings/apiBookings";

const useTodayOperations = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const { isLoading, data: stays } = useQuery({
		queryKey: ["operations", today],
		queryFn: () =>
			getOperationsByDate({
				start: today.toISOString(),
				end: tomorrow.toISOString(),
			}),
	});

	return { isLoading, stays };
};

export { useTodayOperations };
