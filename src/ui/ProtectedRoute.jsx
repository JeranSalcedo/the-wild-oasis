import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/auth/useUser";

import Spinner from "./Spinner";
import toast from "react-hot-toast";

const FullPage = styled.div`
	align-items: center;
	background-color: var(--color-gray-50);
	display: flex;
	height: 100vh;
	justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
	const { isLoading, isAuthenticated } = useUser();

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (!isAuthenticated) {
		toast.error(`User not logged in`);

		return <Navigate to="/login" replace />;
	}

	return isAuthenticated ? children : null;
};

export default ProtectedRoute;
