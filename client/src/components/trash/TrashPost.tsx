import { Note } from "../../types/noteType";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

import { TrashIcon } from "@heroicons/react/16/solid";
import { ArrowUpCircleIcon } from "@heroicons/react/16/solid";

const TrashPost = ({ item }: { item: Note }) => {
  return (
    <>
      <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 text-wrap whitespace-break-spaces relative border hover:ring-1 ring-gray-300">
        {item.tagArr.length > 0 ? (
          <div className="flex w-full mb-1 space-x-2 mb-2">
            {item.tagArr.map((tag) => (
              <div
                className=" flex items-center bg-gray-100 border border-gray-300 px-2 rounded"
                key={tag}
              >
                <p className="text-sm text-gray-700">{tag}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="w-full">
          <p className="text-sm text-gray-400">{item.time}</p>
        </div>
        <div className="text-base mt-1 text-black break-words">{item.name}</div>
        {/* {checked.length > 0 ? (
          <div className="flex flex-col justify-center w-full px-1 mt-1">
            {checked.map((item) => (
              <CheckListItem listItem={item.listItem} listId={item.listId} />
            ))}
          </div>
        ) : null} */}
        {item.codeText ? (
          <CodeMirror
            value={item.codeText}
            theme={tokyoNight}
            extensions={[javascript({ jsx: true })]}
            readOnly={true}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              fontSize: "0.875rem",
            }}
          />
        ) : null}
        <div className="absolute top-0 right-0 cursor-pointer mr-2 mt-4">
          <div className="flex items-center">
            <ArrowUpCircleIcon className="w-4 text-gray-700 mr-1" />
            <TrashIcon className="w-4 text-gray-700" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrashPost;
