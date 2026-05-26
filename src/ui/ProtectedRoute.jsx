import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useUser } from "../features/auth/useUser";

import Spinner from "./Spinner";

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

	if (!isAuthenticated) return <Navigate to="/login" replace />;

	return children;
};

export default ProtectedRoute;
