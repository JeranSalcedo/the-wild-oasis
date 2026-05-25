import styled from "styled-components";

const StyledCheckbox = styled.div`
	display: flex;
	gap: 1.6rem;

	& input[type="checkbox"] {
		accent-color: var(--color-brand-600);
		height: 2.4rem;
		width: 2.4rem;
		outline-offset: 2px;
		transform-origin: 0;
	}

	& input[type="checkbox"]:disabled {
		accent-color: var(--color-brand-600);
	}

	& label {
		align-items: center;
		display: flex;
		flex: 1;
		gap: 0.8rem;
	}
`;

const Checkbox = ({ id, checked, onChange, disabled, children }) => {
	return (
		<StyledCheckbox>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<label htmlFor={disabled ? "" : id}>{children}</label>
		</StyledCheckbox>
	);
};

export default Checkbox;
