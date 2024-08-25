import { create } from "zustand";
import { Patient, ShapeType } from "../types";

type StateType = {
  selectedPatientId:  string | null;
  patients: (Patient & { shapes?: ShapeType[] })[];
};

type ActionType = {
  selectPatient: (patientId: string) => void;
  addPatient: (patient: Patient) => void;
  getPatientById: (id: string) => (Patient & { shapes?: ShapeType[] }) | undefined;
  addShapeToPatient: (patientId: string, shape: ShapeType) => void;
  removeShapeFromPatient: (patientId: string, shapeId: string) => void;
};

type Store = StateType & ActionType;

const defaultInitState: StateType = {
  selectedPatientId: null,
  patients: [],
};

export const useStore = create<Store>((set, get) => ({
  ...defaultInitState,

  selectPatient: (patientId: string) =>
    set(() => ({ selectedPatientId: patientId })),

  addPatient: (patient: Patient) =>
    set((state) => ({ patients: [...(state.patients || []), patient] })),

  getPatientById: (id: string) => get().patients?.find((p) => p.id === id),

  addShapeToPatient: (patientId: string, shape: ShapeType) =>
    
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? { ...patient, shapes: [...(patient.shapes || []), shape] }
          : patient
      ),
    })),

  removeShapeFromPatient: (patientId: string, shapeId: string) =>
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              shapes: patient.shapes?.filter((shape) => shape.uuid !== shapeId),
            }
          : patient
      ),
    })),
}));
