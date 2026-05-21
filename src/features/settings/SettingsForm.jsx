import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

const SettingsForm = () => {
	const {
		isLoading,
		settings: {
			booking_guests_max: guestsMax,
			booking_length_max: lengthMax,
			booking_length_min: lengthMin,
			price_breakfast: priceBreakfast,
		} = {},
	} = useSettings();

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={lengthMin}
					disabled={isLoading}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={lengthMax}
					disabled={isLoading}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={guestsMax}
					disabled={isLoading}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={priceBreakfast}
					disabled={isLoading}
				/>
			</FormRow>
		</Form>
	);
};

export default SettingsForm;
