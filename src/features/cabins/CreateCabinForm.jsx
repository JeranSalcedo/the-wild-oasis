import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

const FormRow = styled.div`
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
`;

const Label = styled.label`
	font-weight: 500;
`;

const CreateCabinForm = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				<Input type="text" id="name" {...register("name")} />
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description</Label>
				<Input
					type="text"
					id="description"
					{...register("description")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="basePrice">Base price</Label>
				<Input
					type="number"
					id="basePrice"
					{...register("basePrice")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount")}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput id="image" accept="image/*" />
			</FormRow>

			<FormRow>
				<Button>Add cabin</Button>
				<Button $variation="secondary" type="reset">
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
