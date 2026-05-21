import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { HiEllipsisVertical } from "react-icons/hi2";

import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-gray-100);
	}

	& svg {
		color: var(--color-gray-700);
		height: 2.4rem;
		width: 2.4rem;
	}
`;

const StyledList = styled.ul`
	background-color: var(--color-gray-0);
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-md);
	position: fixed;

	top: ${(props) => props.$position.y}px;
	right: ${(props) => props.$position.x}px;
`;

const StyledButton = styled.button`
	align-items: center;
	background: none;
	border: none;
	display: flex;
	gap: 1.6rem;
	font-size: 1.4rem;
	padding: 1.2rem 2.4rem;
	text-align: left;
	transition: all 0.2s;
	width: 100%;

	&:hover {
		background-color: var(--color-gray-50);
	}

	& svg {
		color: var(--color-gray-400);
		height: 1.6rem;
		transition: all 0.3s;
		width: 1.6rem;
	}
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState("");
	const [position, setPosition] = useState({});

	const close = () => setActiveMenu("");
	return (
		<MenuContext.Provider
			value={{ activeMenu, setActiveMenu, close, position, setPosition }}
		>
			{children}
		</MenuContext.Provider>
	);
};

const Toggle = ({ id }) => {
	const { activeMenu, setActiveMenu, close, setPosition } =
		useContext(MenuContext);

	const handleClick = (e) => {
		e.stopPropagation();

		const { x, y, height, width } = e.target
			.closest("button")
			.getBoundingClientRect();

		if (activeMenu !== id) {
			setActiveMenu(id);
			setPosition({
				x: window.innerWidth - width - x,
				y: y + height + 8,
			});
		} else {
			close();
		}
	};

	return (
		<StyledToggle data-menu-trigger onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
};

const List = ({ id, children }) => {
	const {
		activeMenu,
		position: { x, y },
		close,
	} = useContext(MenuContext);

	const ref = useOutsideClick(close);

	if (activeMenu !== id) return null;

	return createPortal(
		<StyledList $position={{ x, y }} ref={ref}>
			{children}
		</StyledList>,
		document.body,
	);
};

const Button = ({ icon, onClick, children }) => {
	const { close } = useContext(MenuContext);

	const handleClick = () => {
		onClick?.();
		close();
	};

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
