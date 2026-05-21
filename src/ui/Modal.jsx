import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
	background-color: var(--color-gray-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	left: 50%;
	padding: 3.2rem 4rem;
	position: fixed;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.5s;
`;

const Overlay = styled.div`
	backdrop-filter: blur(4px);
	background-color: var(--backdrop-color);
	position: fixed;
	height: 100vh;
	left: 0;
	top: 0;
	transition: all 0.5s;
	width: 100%;
	z-index: 1000;
`;

const Button = styled.button`
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	position: absolute;
	right: 1.9rem;
	top: 1.2rem;
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-gray-100);
	}

	& svg {
		height: 2.4rem;
		width: 2.4rem;

		color: var(--color-gray-500);
		/* fill: var(--color-gray-500);
		stroke: var(--color-gray-500); */
	}
`;

const Modal = ({ onClose, children }) => {
	return (
		<Overlay>
			<StyledModal>
				<Button onClick={onClose}>
					<HiXMark />
				</Button>
				<div>{children}</div>
			</StyledModal>
		</Overlay>
	);
};

export default Modal;
