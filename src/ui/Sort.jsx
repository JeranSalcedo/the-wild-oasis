import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const Sort = ({ options }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortValue = searchParams.get("sort") ?? options.at(0).value;

	const handleChange = (e) => {
		const params = new URLSearchParams(searchParams);
		params.set("sort", e.target.value);

		setSearchParams(params);
	};

	return (
		<Select value={sortValue} options={options} onChange={handleChange} />
	);
};

export default Sort;
