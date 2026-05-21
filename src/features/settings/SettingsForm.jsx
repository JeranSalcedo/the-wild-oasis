import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

const SettingsForm = () => {
	const { isLoading, settings } = useSettings();
	const {
		booking_guests_max: guestsMax,
		booking_length_max: lengthMax,
		booking_length_min: lengthMin,
		price_breakfast: priceBreakfast,
	} = settings ?? 0;

	const { isUpdating, updateSetting } = useUpdateSetting();

	const handleUpdate = (setting, value) => {
		if (!value || settings[setting] === value) return;

		updateSetting({ [setting]: value });
	};

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={lengthMin}
					onBlur={(e) =>
						handleUpdate("booking_length_min", +e.target.value)
					}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={lengthMax}
					onBlur={(e) =>
						handleUpdate("booking_length_max", +e.target.value)
					}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={guestsMax}
					onBlur={(e) =>
						handleUpdate("booking_guests_max", +e.target.value)
					}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={priceBreakfast}
					onBlur={(e) =>
						handleUpdate("price_breakfast", +e.target.value)
					}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
};

export default SettingsForm;
