import { lazy, Suspense, useCallback, useState } from "react";
import { mockData } from "../constant/data";
import { Patient } from "../types";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import PatientsTable from "../components/PatientsTable";
import { Loader } from "lucide-react";

const PatientDetailsModal = lazy(
  () => import("../components/PatientDetailsModal")
);
const Home = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { selectPatient, addPatient, getPatientById } = useStore();
  const navigate = useNavigate();

  const handleSelectPatient = useCallback((patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedPatient(null);
  }, []);

  const handleViwer = useCallback(
    (patient: Patient) => {
      selectPatient(patient.id);
      !getPatientById(patient.id) && addPatient(patient);
      navigate("/view");
    },
    [selectPatient]
  );

  return (
    <>
      <PatientsTable
        data={mockData}
        onSelect={handleSelectPatient}
        handleViwer={handleViwer}
      />
      <Suspense
        fallback={
          <Loader className="animate-spin z-10 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
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
