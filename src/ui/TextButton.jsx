import styled from "styled-components";

const TextButton = styled.button`
	background: none;
	border: none;
	border-radius: var(--border-radius-sm);
	color: var(--color-brand-600);
	font-weight: 500;
	text-align: center;
	transition: all 0.3s;

	&:hover,
	&:active {
		color: var(--color-brand-700);
	}
`;

export default TextButton;
