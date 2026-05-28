import styled from "styled-components";

const StyledChartLabel = styled.text`
	dominant-baseline: central;
	fill: ${(props) => props.fill ?? "var(--color-gray-700)"};
	pointer-events: none;
	text-anchor: middle;
`;

const RADIAN = Math.PI / 180;

const ChartLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
}) => {
	if (percent === 0) return null;

	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<StyledChartLabel
			x={x}
			y={y}
		>{`${(percent * 100).toFixed(0)}%`}</StyledChartLabel>
	);
};

export default ChartLabel;
