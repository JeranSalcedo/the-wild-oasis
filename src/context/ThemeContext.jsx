/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		false,
		"dark-mode",
	);

	useEffect(() => {
		document.documentElement.classList.add(
			isDarkMode ? "dark-mode" : "light-mode",
		);
		document.documentElement.classList.remove(
			isDarkMode ? "light-mode" : "dark-mode",
		);
	}, [isDarkMode]);

	const toggleTheme = () => setIsDarkMode((isDarkMode) => !isDarkMode);

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined)
		throw new Error("ThemeContext was used outside of ThemeProvider");

	return context;
};

export { ThemeProvider, useTheme };
