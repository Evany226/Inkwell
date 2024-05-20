import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import PostDropdown from "./PostDropdown";
import { useState } from "react";
import EditPostModal from "./EditPostModal";
import { CheckBox } from "../../types/checkedType";
import CheckListItem from "./CheckListItem";

const Post = ({
  name,
  time,
  deleteNote,
  newContent,
  setNewContent,
  editNote,
  editHandleChange,
  tagArr,
  newTags,
  setNewTags,
  checkListArr,
}: {
  name: string;
  time: string;
  deleteNote(): void;
  newContent: string;
  setNewContent(arg: string): void;
  editNote(e: React.ChangeEvent<HTMLFormElement>): void;
  editHandleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  tagArr: string[];
  newTags: string[];
  setNewTags(arg: string[]): void;
  checkListArr: string[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [newTagValue, setNewTagValue] = useState<string>("");
  const [checked, setChecked] = useState<CheckBox[]>([]);

  // useEffect(() => {
  //   const newObject: CheckBox[] = checkListArr.map((item) => ({
  //     listItem: item,
  //     id: uuidv4(),
  //   }));

  //   localStorage.setItem("items", JSON.stringify(newObject));

  //   const saved = localStorage.getItem("items");
  //   if (saved) {
  //     setChecked(JSON.parse(saved));
  //   }
  // }, [checkListArr]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditOpen = () => {
    setNewContent(name);
    setEditOpen(true);
    setOpen(false);
    setNewTags(tagArr);
  };

  const handleEditTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagValue(e.target.value);
    console.log(e.target.value);
  };

  const addEditTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTagValue !== "") {
      setNewTags([...newTags, newTagValue]);
      setNewTagValue("");
      console.log("set tags");
    }
  };

  const removeEditTags = (tagName: string) => {
    setNewTags(newTags.filter((tag) => tag !== tagName));
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
          newTags={newTags}
          handleEditTags={(e) => handleEditTags(e)}
          newTagValue={newTagValue}
          addEditTags={(e) => addEditTags(e)}
          removeEditTags={removeEditTags}
        />
      ) : null}
      <div className="bg-white w-full p-4 flex-col justify-center items-center rounded-lg mt-4 text-wrap whitespace-break-spaces relative border hover:ring-1 ring-gray-300">
        {open ? (
          <div
            className="fixed top-0 right-0 bottom-0 left-0 z-10"
            onClick={() => setOpen(false)}
          ></div>
        ) : null}
        {tagArr.length > 0 ? (
          <div className="flex w-full my-1 space-x-2 mb-2">
            {tagArr.map((tag) => (
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
          <p className="text-sm text-gray-400">{time}</p>
        </div>
        <div className="text-base mt-2 text-black break-words">{name}</div>
        <div className="flex flex-col justify-center w-full px-2 mt-1">
          {checkListArr.map((item) => (
            <CheckListItem listItem={item} />
          ))}
        </div>
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
