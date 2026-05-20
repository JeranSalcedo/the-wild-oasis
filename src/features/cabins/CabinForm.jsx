import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin, updateCabin } from "../../services/apiCabins";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import TextArea from "../../ui/TextArea";

const CabinForm = ({ cabin = {} }) => {
	const isEdit = Boolean(cabin.id);

	const queryClient = useQueryClient();

	const { register, handleSubmit, getValues, formState, reset } = useForm({
		defaultValues: {
			name: cabin.name ?? "",
			description: cabin.description ?? "",
			maxCapacity: cabin.max_capacity ?? 1,
			basePrice: cabin.base_price ?? 1,
			discount: cabin.discount ?? 0,
		},
	});
	const { errors } = formState;

	const { isLoading, mutate } = useMutation({
		mutationFn: isEdit
			? (data) =>
					updateCabin(cabin.id, {
						...data,
						image: data.image ?? cabin.image_url,
					})
			: createCabin,
		onSuccess: () => {
			toast.success(
				isEdit
					? "Cabin successfully edited"
					: "New cabin successfully created",
			);

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});

			if (!isEdit) reset();
		},
		onError: (error) => toast.error(error.message),
	});

	const onSubmit = (data) => {
		mutate({
			...data,
			image: data.image.item(0),
		});
	};

	const onError = (errors) => {
		console.log(errors);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isLoading}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Description" error={errors?.description?.message}>
				<TextArea
					type="text"
					id="description"
					disabled={isLoading}
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					defaultValue={1}
					disabled={isLoading}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="basePrice" error={errors?.basePrice?.message}>
				<Input
					type="number"
					id="basePrice"
					defaultValue={1}
					disabled={isLoading}
					{...register("basePrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Base price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isLoading}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().basePrice ||
							"Discount should be less than the base price",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					disabled={isLoading}
					{...register("image", {
						required: isEdit ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button disabled={isLoading}>
					{isEdit ? "Edit cabin" : "Add cabin"}
				</Button>
				<Button $variation="secondary" type="reset">
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default CabinForm;
