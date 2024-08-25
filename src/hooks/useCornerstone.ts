import { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
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
export const useCornerstone = (
  dcmUrl: string,
  shapes: ShapeType[],
  handleMeasurementComplete: (evt: any) => void,
  setToggleTool:React.Dispatch<React.SetStateAction<boolean>>
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    cornerstone.enable(element);
    cornerstone.loadImage(dcmUrl).then((image: any) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.addTool(cornerstoneTools.RectangleRoiTool);
      if (shapes.length > 0) {
        cornerstoneTools.setToolActive("RectangleRoi", { mouseButtonMask: 1 });
        setToggleTool(true)
        shapes.forEach((shape) => {
          cornerstoneTools.addToolState(element, "RectangleRoi", shape);
        });
      }

      cornerstone.updateImage(element);

      element!.addEventListener(
        cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
        handleMeasurementComplete
      );
    });

    return () => {
      element!.removeEventListener(
        cornerstoneTools.EVENTS.MEASUREMENT_COMPLETED,
        handleMeasurementComplete
      );
      cornerstoneTools.clearToolState(element, "RectangleRoi");
      cornerstone.disable(element);
    };
  }, [dcmUrl]);

  return elementRef;
};
