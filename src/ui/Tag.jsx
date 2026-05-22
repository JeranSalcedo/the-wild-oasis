import styled from "styled-components";

const Tag = styled.span`
	background-color: var(--color-${(props) => props.type}-100);
	color: var(--color-${(props) => props.type}-700);
	border-radius: 100px;
	font-size: 1.1rem;
	font-weight: 600;
	padding: 0.4rem 1.2rem;
	text-transform: uppercase;
	width: fit-content;
`;

export default Tag;
