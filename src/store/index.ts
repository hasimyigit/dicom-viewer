import { create } from "zustand";
import { Patient, ShapeType } from "../types";

type StateType = {
  selectedPatient: null | Patient;
  patients: (Patient & { shapes?: ShapeType[] })[] | null;
};

type ActionType = {
  selectPatient: (patient: Patient) => void;
  addPatient: (patient: Patient) => void;
  getPatientById: (id: string) => (Patient & { shapes?: ShapeType[] }) | null;
  addShapeToPatient: (patientId: string, shape: ShapeType) => void;
  removeShapeFromPatient: (patientId: string, shapeId: string) => void;
};

type Store = StateType & ActionType;

const defaultInitState: StateType = {
  selectedPatient: null,
  patients: null,
};

export const useStore = create<Store>((set, get) => ({
  ...defaultInitState,

  selectPatient: (patient: Patient) =>
    set(() => ({ selectedPatient: patient })),

  addPatient: (patient: Patient) =>
    set((state) => ({ patients: [...(state.patients || []), patient] })),

  getPatientById: (id: string) => get().patients?.find((p) => p.id === id) || null,

  addShapeToPatient: (patientId: string, shape: ShapeType) =>
    
    set((state) => ({
      patients: state.patients?.map((patient) =>
        patient.id === patientId
          ? { ...patient, shapes: [...(patient.shapes || []), shape] }
          : patient
      ),
    })),

  removeShapeFromPatient: (patientId: string, shapeId: string) =>
    set((state) => ({
      patients: state.patients?.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              shapes: patient.shapes?.filter((shape) => shape.uuid !== shapeId),
            }
          : patient
      ),
    })),
}));
