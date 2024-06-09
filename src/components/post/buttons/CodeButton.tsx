import { PlusIcon, CodeBracketSquareIcon } from "@heroicons/react/24/outline";

const CodeButton = ({ setCodeOpen }: { setCodeOpen(arg: boolean): void }) => {
  return (
    <div className="relative group transition-all ml-2 ">
      <CodeBracketSquareIcon className="w-6 text-gray-600 mb-1 dark:text-gray-400" />
      <span
        onClick={() => setCodeOpen(true)}
        className="group-hover:flex hover:bg-gray-200 hidden fixed flex items-center bg-white py-1 px-3 rounded-md border border-gray-400 shadow-md shadow-gray-300 cursor-pointer dark:bg-zinc-700 dark:shadow-zinc-900 dark:border-zinc-700"
      >
        <p className=" text-sm font-medium dark:text-gray-300">
          Add code block
        </p>
        <PlusIcon className="w-4 ml-1 dark:text-gray-300" />
      </span>
    </div>
  );
};

export default CodeButton;
