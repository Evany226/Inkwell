import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { langNames } from "@uiw/codemirror-extensions-langs";
import { XMarkIcon } from "@heroicons/react/16/solid";

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
      <div className="w-full flex flex-col items-end">
        <CodeMirror
          value={code}
          theme={tokyoNight}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          style={{ width: "100%", fontSize: "0.875rem" }}
        />
        <select
          className="border border-gray-300 outline-0 bg-gray-100 mt-2 text-sm rounded-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-300"
          defaultValue={"javascript"}
        >
          {langNames.map((theme, index) => {
            return (
              <option key={index} value={theme}>
                {theme}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className="mt-1 ml-1"
        onClick={() => {
          setCodeOpen(false);
          setCode("");
        }}
      >
        <XMarkIcon className="w-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default CodeModal;
