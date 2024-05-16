import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import PostDropdown from "./PostDropdown";
import { useState } from "react";
import EditPostModal from "./EditPostModal";

const Post = ({
  name,
  time,
  deleteNote,
  newContent,
  setNewContent,
  editNote,
  editHandleChange,
  tagArr,
}: {
  name: string;
  time: string;
  deleteNote(): void;
  newContent: string;
  setNewContent(arg: string): void;
  editNote(e: React.ChangeEvent<HTMLFormElement>): void;
  editHandleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  tagArr: string[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditOpen = () => {
    setNewContent(name);
    setEditOpen(true);
    setOpen(false);
  };

  return (
    <>
      {editOpen ? (
        <>
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
            onClick={() => setEditOpen(false)}
          ></div>
        </>
      ) : null}
      {editOpen ? (
        <EditPostModal
          editNote={editNote}
          newContent={newContent}
          editHandleChange={editHandleChange}
          setEditOpen={setEditOpen}
        />
      ) : null}
      <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 text-wrap whitespace-break-spaces relative border hover:ring-1 ring-gray-300">
        {open ? (
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z-10"
            onClick={() => setOpen(false)}
          ></div>
        ) : null}
        <div className="flex w-full my-1 space-x-2">
          {tagArr.map((tag) => (
            <div className=" flex items-center bg-gray-100 border border-gray-300 px-2 rounded">
              <p className="text-sm text-gray-700">{tag}</p>
            </div>
          ))}
        </div>
        <div className="w-full mt-2">
          <p className="text-sm text-gray-400">{time}</p>
        </div>
        <div className="text-base mt-2 text-black break-words">{name}</div>
        <div className="absolute top-0 right-0 cursor-pointer mr-2 mt-4">
          <EllipsisVerticalIcon
            className="w-4 text-gray-600"
            onClick={handleOpen}
          />
          {open ? (
            <PostDropdown
              deleteNote={deleteNote}
              handleEditOpen={handleEditOpen}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Post;
