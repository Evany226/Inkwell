import {
  BookmarkIcon,
  BookmarkSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const PostDropdown = ({
  deleteNote,
  handleEditOpen,
  pinNote,
  setOpen,
  pinned,
}: {
  deleteNote(): void;
  handleEditOpen(): void;
  pinNote(): void;
  setOpen(arg: boolean): void;
  pinned: boolean;
}) => {
  return (
    <>
      <div className="flex-col w- absolute top-6 right-1 bg-white z-20 py-1 rounded-md border border-gray-400 shadow-md shadow-gray-300 dark:bg-zinc-700 dark:shadow-zinc-900 dark:border-zinc-700">
        <span
          className="flex items-center mt-1 hover:bg-gray-200 py-1 px-3 dark:hover:bg-zinc-600"
          onClick={() => {
            pinNote();
            setOpen(false);
          }}
        >
          {pinned ? (
            <BookmarkSlashIcon className="w-5 text-gray-900 dark:text-gray-300" />
          ) : (
            <BookmarkIcon className="w-5 text-gray-900 dark:text-gray-300" />
          )}
          <p className="text-gray-700 ml-2 text-sm dark:text-gray-300">
            {pinned ? "Unpin" : "Pin"}
          </p>
        </span>
        <span
          className="flex items-center mt-2 hover:bg-gray-200 py-1 px-3  dark:hover:bg-zinc-600"
          onClick={handleEditOpen}
        >
          <PencilSquareIcon className="w-5 text-gray-900 dark:text-gray-300" />
          <p className="text-gray-700 ml-2 text-sm dark:text-gray-300">Edit</p>
        </span>

        <span
          className="flex items-center mt-2 mb-1 hover:bg-gray-200 py-1 px-3  dark:hover:bg-zinc-600"
          onClick={deleteNote}
        >
          <TrashIcon className="w-5 text-red-700 dark:text-red-500" />
          <p className="text-red-700 ml-2 text-sm dark:text-red-500">Trash</p>
        </span>
      </div>
    </>
  );
};

export default PostDropdown;
