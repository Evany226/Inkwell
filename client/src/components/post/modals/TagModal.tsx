import { XMarkIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

const TagModal = ({
  tagValue,
  tagHandleChange,
  addTags,
  tags,
  removeTags,
  setModalOpen,
}: {
  tagValue: string;
  tagHandleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  addTags(e: React.KeyboardEvent<HTMLInputElement>): void;
  tags: string[];
  removeTags(arg: string): void;
  setModalOpen(arg: boolean): void;
}) => {
  return (
    <div className="min-w-[30rem] bg-white z-20 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4 flex-col">
      <h1 className="text-black text-lg font-semibold ml-1 mt-2">Add a tag</h1>
      <p className="text-black text-base ml-1 font-normal mt-1 mb-3">
        Press Enter after each tag
      </p>
      <div className="flex items-center w-full mt-2 px-2 py-1 bg-white border border-slate-700 rounded-md space-x-2">
        {tags.map((tag) => (
          <div className="text-base flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md">
            <p>{tag}</p>
            <XMarkIcon
              className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500"
              onClick={() => removeTags(tag)}
            />
          </div>
        ))}
        <input
          type="text"
          className="resize-none bg-white outline-none px-0 py-1 w-32 text-sm"
          placeholder="Enter tags.."
          value={tagValue}
          onChange={tagHandleChange}
          onKeyDown={addTags}
        ></input>
      </div>
      <div className="flex justify-between items-center mt-2 py-1 ">
        <p className="text-sm ml-1 text-gray-700">
          {Math.max(5 - tags.length, 0)} tags remaining
        </p>
        <div className="flex items-center">
          <button className="flex justify-center items-center bg-red-300 hover:bg-red-500 py-1 px-2 rounded-md border border-red-400">
            <p className="text-sm font-medium text-red-800">Remove All</p>
            <TrashIcon className="w-4 text-red-800 ml-1" />
          </button>
          <button
            className="ml-2 flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border"
            onClick={() => setModalOpen(false)}
          >
            <p className="text-sm font-medium text-gray-700">Close</p>
            <XCircleIcon className="w-4 text-gray-700 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
