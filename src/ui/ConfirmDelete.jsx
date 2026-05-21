import styled from "styled-components";

import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	width: 40rem;

	& p {
		color: var(--color-gray-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		gap: 1.2rem;
		justify-content: flex-end;
	}
`;

const ConfirmDelete = ({ name, onConfirm, disabled, onCloseModal }) => {
	return (
		<StyledConfirmDelete>
			<Heading as="h3">Delete {name}</Heading>
			<p>
				Are you sure you want to delete {name}? This action cannot be
				undone.
			</p>

			<div>
				<Button
					$variation="secondary"
					onClick={onCloseModal}
					disabled={disabled}
				>
					Cancel
				</Button>
				<Button
					$variation="danger"
					onClick={onConfirm}
					disabled={disabled}
				>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
};

export default ConfirmDelete;
