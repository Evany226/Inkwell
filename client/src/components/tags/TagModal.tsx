import { XMarkIcon } from "@heroicons/react/16/solid";

const TagModal = ({
  tagValue,
  tagHandleChange,
  addTags,
  tags,
  removeTags,
}: {
  tagValue: string;
  tagHandleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  addTags(e: React.KeyboardEvent<HTMLInputElement>): void;
  tags: string[];
  removeTags(arg: string): void;
}) => {
  return (
    <div className="min-w-[30rem] h-56 bg-white z-20 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-2 flex-col">
      <h1 className="text-black text-lg font-semibold ml-1 mt-2">
        Add a Tag...
      </h1>
      <p className="text-black text-base ml-1 font-normal mt-1 mb-3">
        Press Enter after each tag
      </p>
      <div className="flex items-center w-full bg-gray-100 mt-2 px-1 py-1 bg-white border border-slate-700 rounded-md">
        {tags.map((tag) => (
          <div className="text-base flex items-center bg-gray-200 border border-gray-300 bg-white px-2 rounded-md ml-2">
            <p>{tag}</p>
            <XMarkIcon
              className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500"
              onClick={() => removeTags(tag)}
            />
          </div>
        ))}
        <input
          type="text"
          className="resize-none bg-white outline-none px-2 py-2"
          placeholder="Enter tags.."
          value={tagValue}
          onChange={tagHandleChange}
          onKeyDown={addTags}
        ></input>
      </div>
    </div>
  );
};

export default TagModal;
