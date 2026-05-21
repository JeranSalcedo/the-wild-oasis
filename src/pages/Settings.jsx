import Heading from "../ui/Heading";
import SettingsForm from "../features/settings/SettingsForm";
import Row from "../ui/Row";

const Settings = () => {
	return (
		<Row>
			<Heading as="h1">Update hotel settings</Heading>
			<SettingsForm />
		</Row>
	);
};

export default Settings;
