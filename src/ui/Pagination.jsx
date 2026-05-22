import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const StyledPagination = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	align-items: center;
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-gray-50)"};
	border: none;
	border-radius: var(--border-radius-sm);
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	display: flex;
	font-size: 1.4rem;
	font-weight: 500;
	gap: 0.4rem;
	justify-content: center;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

const PAGE_SIZE = 10;

const Pagination = ({ count }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.has("page")
		? Number(searchParams.get("page"))
		: 1;
	const pagesCount = Math.ceil(count / PAGE_SIZE);

	const lowerRange = (currentPage - 1) * PAGE_SIZE + 1;
	const higherRange =
		currentPage === pagesCount ? count : currentPage * PAGE_SIZE;

	const previousPage = () => {
		if (currentPage <= 1) return;

		const params = new URLSearchParams(searchParams);
		params.set("page", currentPage - 1);

		setSearchParams(params);
	};

	const nextPage = () => {
		if (currentPage >= pagesCount) return;

		const params = new URLSearchParams(searchParams);
		params.set("page", currentPage + 1);

		setSearchParams(params);
	};

	return (
		<StyledPagination>
			<P>
				Showing <span>{lowerRange}</span>
				{lowerRange < count && (
					<>
						{" "}
						to <span>{higherRange}</span>
					</>
				)}{" "}
				of <span>{count}</span> results
			</P>

			{pagesCount > 1 && (
				<Buttons>
					<PaginationButton
						onClick={previousPage}
						disabled={currentPage <= 1}
					>
						<HiChevronLeft /> <span>Previous</span>
					</PaginationButton>
					<PaginationButton
						onClick={nextPage}
						disabled={currentPage >= pagesCount}
					>
						<span>Next</span> <HiChevronRight />
					</PaginationButton>
				</Buttons>
			)}
		</StyledPagination>
	);
};

export default Pagination;
