import { useNavigate } from "react-router-dom";

import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";

import { useLogout } from "../features/auth/useLogout";

import HeaderUser from "../features/users/HeaderUser";
import Menus from "./Menus";

const HeaderMenu = () => {
	const { isLoading, logout } = useLogout();
	const navigate = useNavigate();

	return (
		<Menus>
			<Menus.Toggle id="header-menu">
				<HeaderUser />
			</Menus.Toggle>

			<Menus.List id="header-menu">
				<Menus.Button
					icon={<HiOutlineUser />}
					onClick={() => navigate("/account")}
				>
					Account settings
				</Menus.Button>
				<Menus.Button
					icon={<HiArrowRightOnRectangle />}
					onClick={logout}
					disabled={isLoading}
				>
					Log out
				</Menus.Button>
			</Menus.List>
		</Menus>
	);
};

export default HeaderMenu;
