import { useEffect, useRef, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import { useStore } from "../store";
import { Link } from "react-router-dom";
import { ShapeType } from "../types";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
  useWebWorkers: true,
});

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

cornerstoneTools.init();

export const Viewer = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const selectedPatient = useStore((state) => state.selectedPatient);
  const { getPatientById, addShapeToPatient, removeShapeFromPatient } = useStore();
  const [toggleTool, setToggleTool] = useState<boolean>(false);

  if (!selectedPatient) {
    return (
      <div className="flex justify-center items-center font-semibold w-full h-[calc(100vh-8.3rem)]">
        <p>
          Hasta seçilmemiş, lütfen{" "}
          <Link className="font-extrabold text-blue-600" to={"/"}>
            Anasayfa
          </Link>
          'ya dönüp seçim yapın.
        </p>
      </div>
    );
  }
  const findedPatient = getPatientById(selectedPatient?.id);
  useEffect(() => {
    const element = elementRef.current;

    cornerstone.enable(element);

    cornerstone.loadImage(selectedPatient.dcmUrl).then((image: any) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
      if (findedPatient?.shapes && findedPatient?.shapes.length > 0) {
        cornerstoneTools.setToolActive("RectangleRoi", { mouseButtonMask: 1 });

        findedPatient.shapes.forEach((shape) => {
          cornerstoneTools.addToolState(element, "RectangleRoi", shape);
        });

        setToggleTool(true);
      }

      element!.addEventListener(
        cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
        handleMeasurementComplete
      );

      cornerstone.updateImage(element);
    });

    return () => {
      element!.removeEventListener(
        "cornerstonetoolsmeasurementcompleted",
        handleMeasurementComplete
      );
      cornerstoneTools.clearToolState(element, "RectangleRoi");
      cornerstone.disable(element);
    };
  }, [selectedPatient]);

  const handleMeasurementComplete = (evt: any) => {
    const { measurementData } = evt.detail;

    addShapeToPatient(selectedPatient.id, measurementData as ShapeType);
  };

  const handleActivateRoiTool = () => {
    setToggleTool((prev) => !prev);
    if (toggleTool) {
      cornerstoneTools.setToolPassive("RectangleRoi", { mouseButtonMask: 1 });
    } else {
      cornerstoneTools.setToolActive("RectangleRoi", { mouseButtonMask: 1 });
    }
  };

  const handleRemoveSelection = (shapeId: string) => {
    const removedShape = findedPatient?.shapes?.find(
      (shape) => shape.uuid === shapeId
    );
    const element = elementRef.current;
    cornerstoneTools.removeToolState(element, "RectangleRoi", removedShape);
    removeShapeFromPatient(selectedPatient.id, shapeId);
    cornerstone.updateImage(element);
  };

  return (
    <div className="flex">
      <div className="md:w-[70%] w-[50%]">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleActivateRoiTool}
            className="py-2.5 px-5 me-2 mx-2 my-2 text-sm font-medium  focus:outline-none  rounded-lg border  hover:text-white focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 dhover:text-white hover:bg-gray-700"
          >
            {toggleTool ? " ROI Aracını Kapat" : "ROI Aracını Aç"}
          </button>
          <p>
            <strong>Hasta Adı:</strong> {selectedPatient?.name}{" "}
            <strong>Hasta ID:</strong> {selectedPatient?.id}{" "}
            <strong>Tetkik Türü:</strong> {selectedPatient?.examinationType}{" "}
            <strong>Tetkik Tarihi:</strong> {selectedPatient?.examinationDate}{" "}
          </p>
        </div>
        <div
          ref={elementRef}
          className="bg-black w-full h-[calc(100vh-8.3rem)]"
        />
      </div>

      <div className=" p-6 md:w-[30%] w-[50%]">
        {findedPatient?.shapes && findedPatient?.shapes.length > 0 && (
          <h3 className="py-4 font-semibold text-zinc-950">Seçimler</h3>
        )}
        <div className="flex flex-col gap-4 max-h-[calc(100vh-11rem)] overflow-y-scroll overflow-x-hidden">
          {findedPatient?.shapes &&
            findedPatient?.shapes.length > 0 &&
            findedPatient?.shapes.map((selection, i) => (
              <ul
                key={i}
                className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <li className="w-full px-4 py-2 rounded-b-lg">
                  Seçim ID: {selection.uuid}
                </li>
                <li className="w-full px-4 py-2 rounded-b-lg">
                  mean: {selection.cachedStats.mean}
                </li>
                <li className="w-full px-4 py-2 rounded-b-lg">
                  stdDev: {selection.cachedStats.stdDev}
                </li>
                <li className="w-full px-4 py-2 rounded-b-lg">
                  <button
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => handleRemoveSelection(selection.uuid)}
                  >
                    Sil
                  </button>
                </li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};
