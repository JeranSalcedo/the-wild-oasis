import { useEffect, useState } from "react";

const useLocalStorageState = (initialState, key) => {
	const [value, setValue] = useState(() => {
		try {
			const storedValue = localStorage.getItem(key);

			return storedValue ? JSON.parse(storedValue) : initialState;
		} catch {
			return initialState;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export { useLocalStorageState };
