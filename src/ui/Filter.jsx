import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-100);
	border-radius: var(--border-radius-sm);
	box-shadow: var(--shadow-sm);
	display: flex;
	gap: 0.4rem;
	padding: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-gray-0);
	border: none;
	border-radius: var(--border-radius-sm);
	font-size: 1.4rem;
	font-weight: 500;
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

const Filter = ({ field, defaultFilter, options }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const defaultValue = defaultFilter?.value ?? "";
	const activeFilter = searchParams.get(field) ?? defaultValue;

	const handleClick = (value) => {
		const params = new URLSearchParams(searchParams);

		if (value === activeFilter || value === defaultValue) {
			params.delete(field);

			setSearchParams(params);
		} else {
			params.set(field, value);
		}

		setSearchParams(params);
	};

	return (
		<StyledFilter>
			{defaultFilter && (
				<FilterButton
					$active={activeFilter === defaultFilter.value}
					onClick={() => handleClick(defaultFilter.value)}
				>
					{defaultFilter.label}
				</FilterButton>
			)}

			{options.map((filter) => (
				<FilterButton
					key={filter.value}
					$active={activeFilter === filter.value}
					onClick={() => handleClick(filter.value)}
				>
					{filter.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
};

export default Filter;
