import { ShapeType } from "../types";


type Props = { shapes: ShapeType[]; onRemove: (shapeId:string) => void };
export const ShapeList = ({ shapes, onRemove }: Props) => (
  <>
    {shapes.length > 0 && (
      <h3 className="py-4 font-semibold text-zinc-950 mt-14 md:mt-0">Seçimler</h3>
    )}
    <div className="flex flex-col gap-4 max-h-[calc(100vh-11rem)] overflow-y-scroll overflow-x-hidden">
      {shapes.map((selection, i) => (
        <ul
          key={i}
          className="w-full text-sm font-medium text-gray-900 bg-white border rounded-lg dark:bg-gray-700"
        >
          <li className="w-full px-4 py-2">Seçim ID: {selection.uuid}</li>
          <li className="w-full px-4 py-2">
            mean: {selection.cachedStats.mean}
          </li>
          <li className="w-full px-4 py-2">
            stdDev: {selection.cachedStats.stdDev}
          </li>
          <li className="w-full px-4 py-2">
            <button
              className="text-white bg-red-500 rounded-lg px-5 py-2.5"
              onClick={() => onRemove(selection.uuid)}
            >
              Sil
            </button>
          </li>
        </ul>
      ))}
    </div>
  </>
);
