import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { useTheme } from "../context/ThemeContext";

import IconButton from "./IconButton";

const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<IconButton onClick={toggleTheme}>
			{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
		</IconButton>
	);
};

export default ThemeToggle;
