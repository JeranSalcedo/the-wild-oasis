import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
	${(props) =>
		props.type === "horizontal" &&
		css`
			align-items: center;
			display: grid;
			gap: 2.4rem;
			grid-template-columns: 24rem 1fr 1.2fr;
			padding: 2.4rem 0;

			&:first-child {
				padding-top: 0;
			}

			&:last-child {
				padding-bottom: 0;
			}

			&:not(:last-child) {
				border-bottom: 1px solid var(--color-gray-100);
			}

			&:has(button) {
				display: flex;
				gap: 1.2rem;
				justify-content: flex-end;
			}
		`}

	${(props) =>
		props.type === "vertical" &&
		css`
			display: flex;
			flex-direction: column;
			gap: 0.8rem;
			padding: 1.2rem 0;
		`}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	color: var(--color-red-700);
	font-size: 1.4rem;
`;

const FormRow = ({ type = "horizontal", label, error, children }) => {
	return (
		<StyledFormRow type={type}>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
};

export default FormRow;
