import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

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
	const queryClient = useQueryClient();

	const { register, handleSubmit, reset } = useForm();

	const { isLoading, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});

			reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const onSubmit = (data) => {
		mutate({
			name: data.name,
			description: data.description,
			image_url: data.image,
			max_capacity: data.maxCapacity,
			base_price: data.basePrice,
			discount: data.discount,
		});
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
				<Button disabled={isLoading}>Add cabin</Button>
				<Button $variation="secondary" type="reset">
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
