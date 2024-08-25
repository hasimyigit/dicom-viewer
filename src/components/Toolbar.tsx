type Props = {
  toggleTool: boolean;
  onToggle: () => void;
};
export const Toolbar = ({ toggleTool, onToggle }: Props) => (
  <button
    type="button"
    onClick={onToggle}
    className="py-2.5 px-5 me-2 mx-2 my-2 text-sm font-medium rounded-lg border bg-gray-800 text-gray-400 hover:bg-gray-700"
  >
    {toggleTool ? " ROI Aracını Kapat" : "ROI Aracını Aç"}
  </button>
);
