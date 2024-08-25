import { Patient } from "../types";
import Modal from "./common/Modal"
import { PatientDetails } from "./PatientDetails"

type PatientDetailsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    patient:Patient
  };
const PatientDetailsModal:React.FC<PatientDetailsModalProps> = ({isOpen,onClose,patient}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hasta Detayları">
        <PatientDetails patient={patient} align="flex-col"/>
    </Modal>
  )
}

export default PatientDetailsModal