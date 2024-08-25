export type ExaminationType = "CT" | "XRAY";

export interface Patient {
  name: string;
  id: string;
  examinationType: ExaminationType;
  examinationDate: string;
  dcmUrl: string;
}

interface Handles {
  x: number;
  y: number;
  highlight: boolean;
  active: boolean;
  moving?: boolean; 
}

interface BoundingBox {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface TextBox {
  active: boolean;
  hasMoved: boolean;
  movesIndependently: boolean;
  drawnIndependently: boolean;
  allowedOutsideImage: boolean;
  hasBoundingBox: boolean;
  x: number;
  y: number;
  boundingBox: BoundingBox;
}

interface CachedStats {
  area: number;
  perimeter: number;
  count: number;
  mean: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
}

export interface ShapeType {
  visible: boolean;
  active: boolean;
  invalidated: boolean;
  handles: {
    start: Handles;
    end: Handles & { moving?: boolean }; 
    initialRotation: number;
    textBox: TextBox;
  };
  uuid: string;
  cachedStats: CachedStats;
  unit: string;
}