import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import PostDropdown from "./PostDropdown";
import { useState } from "react";
import EditPost from "./EditPost";

const Post = ({
  name,
  time,
  deleteNote,
}: {
  name: string;
  time: string;
  deleteNote(): void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setOpen(false);
  };

  return (
    <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 text-wrap whitespace-break-spaces relative border hover:ring-1 ring-gray-300">
      {editOpen ? (
        <>
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
            onClick={() => setEditOpen(false)}
          ></div>
        </>
      ) : null}
      {editOpen ? <EditPost /> : null}
      {open ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-10"
          onClick={() => setOpen(false)}
        ></div>
      ) : null}
      <div className="text-sm text-gray-400">{time}</div>
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
  );
};

export default Post;
