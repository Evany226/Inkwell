import { XCircleIcon } from "@heroicons/react/16/solid";

const Confirm = ({
  deleteNote,
  setModalOpen,
  itemId,
}: {
  deleteNote(arg: string): void;
  setModalOpen(arg: boolean): void;
  itemId: string;
}) => {
  return (
    <div className="flex flex-col items-center w-[24rem] bg-white z-20 fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-2 py-2 dark:bg-zinc-800 dark:border-zinc-700">
      <h1 className="text-black text-lg font-semibold mt-2 dark:text-gray-300">
        Delete Permanently
      </h1>
      <p className="text-red-700 text-base font-normal mt-1 mb-1 pb-0 text-center dark:text-red-400">
        If you click confirm, this item will be permanently deleted. This action
        is irreversible.
      </p>
      <div className="flex justify-center items-center mt-2 py-1 ">
        <div className="flex items-center">
          <button
            onClick={() => deleteNote(itemId)}
            className="ml-2 flex justify-center items-center bg-red-300 hover:bg-red-400 py-1 px-2 rounded-md border border-red-400 dark:bg-red-400 dark:hover:bg-red-600"
          >
            <p className="text-sm font-medium text-red-700 dark:hover:text-red-300">
              Confirm
            </p>
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="ml-2 flex justify-center items-center bg-gray-100 py-1 px-2 rounded-md border hover:bg-gray-300 "
          >
            <p className="text-sm font-medium text-gray-700">Close</p>
            <XCircleIcon className="w-4 text-gray-700 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
