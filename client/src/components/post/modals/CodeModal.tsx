import { TrashIcon } from "@heroicons/react/16/solid";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

const CodeModal = ({
  setCodeOpen,
  code,
  setCode,
}: {
  setCodeOpen(arg: boolean): void;
  code: string;
  setCode(arg: string): void;
}) => {
  return (
    <div className="w-full flex items-start">
      <button
        className="mt-0.5"
        onClick={() => {
          setCodeOpen(false);
          setCode("");
        }}
      >
        <TrashIcon className="w-4 text-red-800 mr-1" />
      </button>
      <CodeMirror
        value={code}
        theme={tokyoNight}
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CodeModal;
