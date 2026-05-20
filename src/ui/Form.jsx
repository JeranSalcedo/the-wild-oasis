import styled, { css } from "styled-components";

const Form = styled.form`
	font-size: 1.4rem;
	overflow: hidden;

	${(props) =>
		props.type !== "modal" &&
		css`
			background-color: var(--color-gray-0);
			border: 1px solid var(--color-gray-100);
			border-radius: var(--border-radius-md);
			padding: 2.4rem 4rem;
		`}

	${(props) =>
		props.type === "modal" &&
		css`
			width: 80rem;
		`}
`;

export default Form;
