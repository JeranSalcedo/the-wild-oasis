import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
	background-color: var(--color-gray-0);
	border: 1px solid var(--color-gray-200);
	border-radius: 7px;
	font-size: 1.4rem;
	overflow: hidden;
`;

const CommonRow = styled.div`
	align-items: center;
	column-gap: 2.4rem;
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	background-color: var(--color-gray-50);
	border-bottom: 1px solid var(--color-gray-100);
	color: var(--color-gray-600);
	font-weight: 600;
	letter-spacing: 0.4px;
	padding: 1.6rem 2.4rem;
	text-transform: uppercase;
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-gray-100);
	}
`;

const StyledBody = styled.section`
	margin: 0.4rem 0;
`;

const Footer = styled.footer`
	background-color: var(--color-gray-50);
	display: flex;
	justify-content: center;
	padding: 1.2rem;

	&:not(:has(*)) {
		display: none;
	}
`;

const Empty = styled.p`
	font-weight: 500;
	font-size: 1.6rem;
	margin: 2.4rem;
	text-align: center;
`;

const TableContext = createContext();

const Table = ({ columns, children }) => {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
};

const Header = ({ children }) => {
	const { columns } = useContext(TableContext);

	return (
		<StyledHeader role="row" $columns={columns} as="header">
			{children}
		</StyledHeader>
	);
};

const Row = ({ children }) => {
	const { columns } = useContext(TableContext);

	return (
		<StyledRow role="row" $columns={columns}>
			{children}
		</StyledRow>
	);
};

const Body = ({ data, render }) => {
	if (!data.length) return <Empty>No data to show at the moment</Empty>;

	return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
