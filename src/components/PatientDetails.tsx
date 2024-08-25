import { Patient } from "../types";

export const PatientDetails = ({ patient, align }:{patient:Patient, align: 'flex-col'|'flex-row'}) => (
    <div className={`flex gap-1 ${align}`}>
      <p><strong>Hasta Adı:</strong> {patient?.name}</p>
      <p><strong>Hasta ID:</strong> {patient?.id}</p>
      <p><strong>Tetkik Türü:</strong> {patient?.examinationType}</p>
      <p><strong>Tetkik Tarihi:</strong> {patient?.examinationDate}</p>
    </div>
  );