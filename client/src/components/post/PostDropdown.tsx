import {
  BookmarkSquareIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const PostDropdown = ({
  deleteNote,
  handleEditOpen,
}: {
  deleteNote(): void;
  handleEditOpen(): void;
}) => {
  return (
    <>
      <div className="flex-col w- absolute top-6 right-1 bg-white z-20 py-1 rounded-md border border-gray-400 shadow-md shadow-gray-300">
        <span className="flex items-center mt-1 hover:bg-gray-200 py-1 px-3">
          <BookmarkSquareIcon className="w-5 text-gray-900" />
          <p className="text-gray-700 ml-2 text-sm">Pin</p>
        </span>
        <span
          className="flex items-center mt-2 hover:bg-gray-200 py-1 px-3"
          onClick={handleEditOpen}
        >
          <PencilSquareIcon className="w-5 text-gray-900" />
          <p className="text-gray-700 ml-2 text-sm">Edit</p>
        </span>

        <span
          className="flex items-center mt-2 mb-1 hover:bg-gray-200 py-1 px-3"
          onClick={deleteNote}
        >
          <TrashIcon className="w-5 text-red-700" />
          <p className="text-red-700 ml-2 text-sm">Delete</p>
        </span>
      </div>
    </>
  );
};

export default PostDropdown;
