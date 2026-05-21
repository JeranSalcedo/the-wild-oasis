import Button from "../../ui/Button";
import CabinForm from "../../features/cabins/CabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
	return (
		<div>
			<Modal>
				<Modal.Open window="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
};

export default AddCabin;
