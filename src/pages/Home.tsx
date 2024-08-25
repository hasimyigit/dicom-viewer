import { useState } from "react";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import { mockData } from "../constant/data";
import { Patient } from "../types";
import { ScanEye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
const Home = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { selectPatient, addPatient, getPatientById } = useStore();
  const navigate = useNavigate();

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  const handleViwer = (patient: Patient) => {
    selectPatient(patient);
    !getPatientById(patient.id) && addPatient(patient);
    navigate("/view");
  };
  const columns = [
    {
      header: "Hasta ID",
      accessor: (row: Patient) => row.id,
    },
    {
      header: "Hasta Adı",
      accessor: (row: Patient) => row.name,
    },
    {
      header: "Tetkik Türü",
      accessor: (row: Patient) => row.examinationType,
    },
    {
      header: "Tetkik Tarihi",
      accessor: (row: Patient) => row.examinationDate,
    },
    {
      header: "Görüntü",
      accessor: (row: Patient) => (
        <button
          className="text-white bg-gray-800 hover:bg-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            handleViwer(row);
          }}
        >
          <ScanEye />
        </button>
      ),
    },
  ];
  return (
    <>
      <Table data={mockData} columns={columns} onSelect={handleSelectPatient} />
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Hasta Detayları">
        <p>
          <strong>Hasta Adı:</strong> {selectedPatient?.name} <br />
          <strong>Hasta ID:</strong> {selectedPatient?.id} <br />
          <strong>Tetkik Türü:</strong> {selectedPatient?.examinationType}{" "}
          <br />
          <strong>Tetkik Tarihi:</strong> {selectedPatient?.examinationDate}{" "}
          <br />
        </p>
      </Modal>
    </>
  );
};

export default Home;
