import { HiArrowRightOnRectangle } from "react-icons/hi2";

import { useLogout } from "./useLogout";

import IconButton from "../../ui/IconButton";
import SpinnerMini from "../../ui/SpinnerMini";

const LogoutButton = () => {
	const { isLoading, logout } = useLogout();

	return (
		<IconButton onClick={logout} disabled={isLoading}>
			{isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
		</IconButton>
	);
};

export default LogoutButton;
