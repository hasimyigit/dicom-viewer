import { lazy, Suspense, useState } from "react";
import { mockData } from "../constant/data";
import { Patient } from "../types";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import PatientsTable from "../components/PatientsTable";

const PatientDetailsModal = lazy(
  () => import("../components/PatientDetailsModal")
);
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
    selectPatient(patient.id);
    !getPatientById(patient.id) && addPatient(patient);
    navigate("/view");
  };

  return (
    <>
      <PatientsTable
        data={mockData}
        onSelect={handleSelectPatient}
        handleViwer={handleViwer}
      />
      <Suspense
        fallback={
          <p>loading..</p>
        }
      >
        {selectedPatient && (
          <PatientDetailsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            patient={selectedPatient}
          />
        )}
      </Suspense>
    </>
  );
};

export default Home;
