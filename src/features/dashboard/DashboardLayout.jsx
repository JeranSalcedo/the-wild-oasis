import styled from "styled-components";

const StyledDashboardLayout = styled.div`
	display: grid;
	gap: 2.4rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
`;

const DashboardLayout = () => {
	return (
		<StyledDashboardLayout>
			<div>Statistics</div>
			<div>Today&apos;s activity</div>
			<div>Chart stay durations</div>
			<div>Chart sales</div>
		</StyledDashboardLayout>
	);
};

export default DashboardLayout;
