import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import { PinIcon } from "../global/PinIcon";
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
import { v4 as uuidv4 } from "uuid";
import { Note } from "../../types/noteType";
import { ModalMask } from "../global/ModalMask";

const Post = ({
  note,
  deleteNote,
  newContent,
  setNewContent,
  editNote,
  handleEditChange,
  newTags,
  setNewTags,
  newCode,
  setNewCode,
  newCheckList,
  setNewCheckList,
  pinNote,
}: {
  note: Note;
  deleteNote(): void;
  newContent: string;
  setNewContent(arg: string): void;
  editNote(e: React.ChangeEvent<HTMLFormElement>): void;
  handleEditChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  newTags: string[];
  setNewTags(arg: string[]): void;
  newCode: string;
  setNewCode(arg: string): void;
  newCheckList: CheckBox[];
  setNewCheckList(arg: CheckBox[]): void;
  pinNote(arg: string): void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [newTagValue, setNewTagValue] = useState<string>("");
  const [checked, setChecked] = useState<CheckBox[]>([]);
  const [newCheckValue, setNewCheckValue] = useState<string>("");
  const [editTagValid, setEditTagValid] = useState<boolean>(true);

  //destructuring note prop
  const { name, time, tagArr, codeText, id, pinned, scheduled } = note;

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
    setNewCode(codeText);
    setNewCheckList(checked);
  };

  const handleEditTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagValue(e.target.value);
    console.log(e.target.value);
  };

  const cancelEdit = (arg: boolean) => {
    setEditOpen(arg);
    setNewTags([]);
  };

  const addEditTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTagValue !== "") {
      if (newTags.length < 3) {
        setNewTags([...newTags, newTagValue]);
        setNewTagValue("");
      } else {
        setEditTagValid(false);
        setTimeout(() => {
          setEditTagValid(true);
        }, 2000);
      }
    }
  };

  const removeEditTags = (tagName: string) => {
    setNewTags(newTags.filter((tag) => tag !== tagName));
  };

  const handleEditCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCheckValue(e.target.value);
    console.log(e.target.value);
  };

  const addEditCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newCheckValue !== "") {
      setNewCheckList(
        newCheckList.concat({ listItem: newCheckValue, listId: uuidv4() })
      );
      setNewCheckValue("");
    }
  };

  const removeEditCheck = (listId: string) => {
    setNewCheckList(newCheckList.filter((item) => item.listId != listId));
  };

  return (
    <>
      <ModalMask modalOpen={editOpen} setModalOpen={cancelEdit}>
        <EditPostModal
          editNote={editNote}
          newContent={newContent}
          handleEditChange={handleEditChange}
          setEditOpen={setEditOpen}
          newTags={newTags}
          handleEditTags={(e) => handleEditTags(e)}
          newTagValue={newTagValue}
          addEditTags={(e) => addEditTags(e)}
          removeEditTags={removeEditTags}
          cancelEdit={cancelEdit}
          newCode={newCode}
          setNewCode={setNewCode}
          newCheckList={newCheckList}
          newCheckValue={newCheckValue}
          addEditCheck={(e) => addEditCheck(e)}
          handleEditCheck={(e) => handleEditCheck(e)}
          removeEditCheck={removeEditCheck}
          setChecked={setChecked}
          editTagValid={editTagValid}
        />
      </ModalMask>

      <div className="bg-white w-full p-4 pb-3 flex-col justify-center items-center rounded-lg mt-4 text-wrap whitespace-break-spaces relative border hover:ring-1 ring-gray-300 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:ring-zinc-700">
        {tagArr.length > 0 ? (
          <div className="flex w-full mb-1 space-x-2 mb-2">
            {tagArr.map((tag) => (
              <div
                className=" flex items-center bg-gray-100 border border-gray-300 px-2 rounded dark:bg-neutral-700 dark:border-zinc-700"
                key={tag}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {tag}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="w-full">
          <p className="text-sm text-gray-400 dark:text-gray-500">{time}</p>
        </div>

        <div className="text-base mt-1 text-black break-words dark:text-gray-300">
          {name}
        </div>

        {checked.length > 0 ? (
          <div className="flex flex-col justify-center w-full px-1 mt-1">
            {checked.map((item) => (
              <CheckListItem
                key={item.listId}
                listItem={item.listItem}
                listId={item.listId}
              />
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
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          />
        ) : null}

        {scheduled ? (
          <div className="w-full flex justify-start space-x-1 mt-1">
            <BellIcon className="w-4 fill-yellow-300" />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Reminder:{" "}
              {new Date(scheduled).toLocaleString("en-US", {
                timeZoneName: "short",
              })}
            </p>
          </div>
        ) : null}

        <div className="absolute top-0 right-0 mr-2 mt-4">
          <div className="flex items-center">
            {pinned ? <PinIcon /> : null}

            <EllipsisVerticalIcon
              className="w-4 text-gray-600 cursor-pointer"
              onClick={handleOpen}
            />
          </div>

          <ModalMask
            modalOpen={open}
            setModalOpen={setOpen}
            customClass="fixed top-0 right-0 bottom-0 left-0 z-10"
          >
            <PostDropdown
              deleteNote={deleteNote}
              handleEditOpen={handleEditOpen}
              pinNote={() => pinNote(id)}
              setOpen={setOpen}
              pinned={pinned}
            />
          </ModalMask>
        </div>
      </div>
    </>
  );
};

export default Post;
