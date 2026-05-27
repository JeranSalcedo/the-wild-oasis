import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
import UpdateUserProfileForm from "../features/users/UpdateUserProfileForm";

const Account = () => {
	return (
		<>
			<Heading as="h1">Update your account</Heading>

			<Row>
				<Heading as="h3">Update user data</Heading>
				<UpdateUserProfileForm />
			</Row>

			<Row>
				<Heading as="h3">Update password</Heading>
				<UpdatePasswordForm />
			</Row>
		</>
	);
};

export default Account;
