import { useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";

import { useStore } from "../store";
import { Patient, ShapeType } from "../types";
import { Toolbar } from "../components/Toolbar";
import { PatientDetails } from "../components/PatientDetails";
import { useCornerstone } from "../hooks/useCornerstone";
import NoPatientSelected from "../components/NoPatientSelected";
import { ShapeList } from "../components/ShapeList";



export const Viewer = () => {


  const { getPatientById, addShapeToPatient, removeShapeFromPatient, selectedPatientId} = useStore();
  const [toggleTool, setToggleTool] = useState<boolean>(false);
 
  if (!selectedPatientId) return <NoPatientSelected/>

  const findedPatient = getPatientById(selectedPatientId);

  const handleMeasurementComplete = (evt: any) => {
    const { measurementData } = evt.detail;

    addShapeToPatient(selectedPatientId, measurementData as ShapeType);
  };
  const handleActivateRoiTool = () => {
    setToggleTool((prev) => !prev);
    if (toggleTool) {
      cornerstoneTools.setToolPassive("RectangleRoi", { mouseButtonMask: 1 });
    } else {
      cornerstoneTools.setToolActive("RectangleRoi", { mouseButtonMask: 1 });
    }
  };

  const elementRef = useCornerstone(findedPatient?.dcmUrl!, findedPatient?.shapes || [], handleMeasurementComplete, setToggleTool);


  const handleRemoveShape  = (shapeId: string) => {
    const removedShape = findedPatient?.shapes?.find(
      (shape) => shape.uuid === shapeId
    );
    const element = elementRef.current;
    cornerstoneTools.removeToolState(element, "RectangleRoi", removedShape);
    removeShapeFromPatient(selectedPatientId, shapeId);
    cornerstone.updateImage(element);
  };

  return (
    <div className="flex">
      <div className="md:w-[70%] w-[50%]">
        <div className="flex items-center">
          <Toolbar toggleTool={toggleTool} onToggle={handleActivateRoiTool} />
          <PatientDetails patient={findedPatient as Patient} align="flex-row" />
        </div>
        <div ref={elementRef} className="bg-black w-full h-[calc(100vh-8.3rem)]" />
      </div>
      <div className="p-6 md:w-[30%] w-[50%]">
        <ShapeList shapes={findedPatient?.shapes || []} onRemove={handleRemoveShape} />
      </div>
    </div>
  );
};
