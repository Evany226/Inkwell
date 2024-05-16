import { HashtagIcon, PlusIcon } from "@heroicons/react/24/outline";

const TagButton = ({ setModalOpen }: { setModalOpen(arg: boolean): void }) => {
  return (
    <div className="relative group">
      <HashtagIcon className="w-6 text-gray-600" />
      <span
        onClick={() => setModalOpen(true)}
        className="group-hover:flex hover:bg-gray-200 hidden fixed flex items-center bg-white py-2 px-3 rounded-md border border-gray-400 shadow-md shadow-gray-300 cursor-pointer"
      >
        <p className=" text-sm font-medium ">Add Tags</p>
        <PlusIcon className="w-4 ml-1" />
      </span>
    </div>
  );
};

export default TagButton;
