import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import PostDropdown from "./PostDropdown";
import { useState, useEffect } from "react";
import EditPostModal from "./EditPostModal";

import CheckListItem from "./CheckListItem";
import { db, auth } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { CheckBox } from "../../types/checkedType";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

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
  id,
  codeText,
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
  id: string;
  codeText: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [newTagValue, setNewTagValue] = useState<string>("");
  const [checked, setChecked] = useState<CheckBox[]>([]);

  const user = auth.currentUser;

  useEffect(() => {
    const getData = async (uid: string) => {
      const checkRef = collection(db, "users", uid, "notes", id, "checkList");
      const querySnapshot = await getDocs(checkRef);
      const documents: CheckBox[] = querySnapshot.docs.map((doc) => ({
        listItem: doc.get("listItem"),
        listId: doc.get("listId"),
      }));
      setChecked(documents);
    };

    if (user) {
      getData(user.uid);
    }
  }, [id, user]);

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
        {checked.length > 0 ? (
          <div className="flex flex-col justify-center w-full px-1 mt-1">
            {checked.map((item) => (
              <CheckListItem listItem={item.listItem} listId={item.listId} />
            ))}
          </div>
        ) : null}
        {codeText ? (
          <CodeMirror
            value={codeText}
            theme={tokyoNight}
            extensions={[javascript({ jsx: true })]}
            readOnly={true}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              fontSize: "0.875rem",
            }}
          />
        ) : null}
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
