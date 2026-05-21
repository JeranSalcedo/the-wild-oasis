import { useState } from "react";

import Button from "../../ui/Button";
import CabinForm from "../../features/cabins/CabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<div>
			<Button
				onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
			>
				Add new cabin
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CabinForm onCloseModal={() => setIsOpenModal(false)} />
				</Modal>
			)}
		</div>
	);
};

export default AddCabin;
