import {
  BellAlertIcon,
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

import TagButton from "./buttons/TagButton";
import CheckListButton from "./buttons/CheckListButton";
import CodeButton from "./buttons/CodeButton";
import CodeModal from "../modals/CodeModal";
import TextareaAutosize from "react-textarea-autosize";

interface PostFormProps {
  newNote: string;
  addNote(event: React.ChangeEvent<HTMLFormElement>): void;
  handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  checkList: string[];
  removeList(item: string): void;
  tags: string[];
  removeTags(item: string): void;
  codeOpen: boolean;
  setCodeOpen(arg: boolean): void;
  setModalOpen(arg: boolean): void;
  setListOpen(arg: boolean): void;
  code: string;
  setCode(arg: string): void;
}

export function PostForm({
  newNote,
  addNote,
  handleNoteChange,
  checkList,
  removeList,
  tags,
  removeTags,
  codeOpen,
  setCodeOpen,
  setModalOpen,
  setListOpen,
  code,
  setCode,
}: PostFormProps) {
  return (
    <form
      className="rounded-lg w-full h-full flex flex-col justify-start items-start px-4 py-2 border bg-white dark:bg-zinc-800 dark:border-zinc-700"
      onSubmit={addNote}
    >
      <div className="pb-2 flex flex-col justify-start items-start relative w-full max-h-[50vh] bg-inherit border-b dark:border-zinc-700">
        <TextareaAutosize
          className="w-full my-2 ml-1 mt-4 text-base resize-none  h-auto overflow-auto bg-transparent outline-none dark:caret-white dark:text-gray-300"
          placeholder="Create a note..."
          minRows={1}
          maxRows={7}
          value={newNote}
          onChange={(e) => handleNoteChange(e)}
        />

        {checkList.length > 0 ? (
          <div className="flex w-full px-1 mb-1 space-x-2">
            <div className="flex flex-col w-full px-1 ">
              {checkList.map((item) => (
                <div className="flex items-center mb-2 outline-none">
                  <input
                    disabled
                    type="checkbox"
                    className="w-4 h-4 border-gray-500"
                  ></input>
                  <label className="ms-2 text-base text-black font-normal dark:text-gray-400">
                    {item}
                  </label>
                  <XMarkIcon
                    className="w-4 text-gray-600 ml-1 cursor-pointer mt-0.5"
                    onClick={() => removeList(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {codeOpen ? (
          <div className="w-full px-1 mb-1 space-x-2">
            <CodeModal
              setCodeOpen={setCodeOpen}
              code={code}
              setCode={setCode}
            />
          </div>
        ) : null}

        {tags.length > 0 ? (
          <div className="flex w-full my-1 px-1 space-x-2">
            {tags.map((tag) => (
              <div className="text-sm flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md dark:bg-neutral-700 dark:border-zinc-700">
                <p className="dark:text-gray-300">{tag}</p>
                <XMarkIcon
                  className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500"
                  onClick={() => removeTags(tag)}
                />
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex items-center my-2">
          <TagButton setModalOpen={setModalOpen} />
          <CodeButton setCodeOpen={setCodeOpen} />
          <CheckListButton setListOpen={setListOpen} />
        </div>
      </div>
      <div className="w-full py-4 flex justify-between items-center">
        <span className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border cursor-pointer dark:bg-zinc-900 dark:border-zinc-700">
          <BellAlertIcon className="w-5 text-gray-700 dark:text-gray-300" />
          <p className="text-sm font-medium text-gray-700 ml-2 dark:text-gray-300">
            Reminders
          </p>
          <ChevronDoubleDownIcon className="w-5 text-gray-700 ml-2 mt-0.5 dark:text-gray-300" />
        </span>
        <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Save
          </p>
          <PlusCircleIcon className="w-4 text-gray-600 ml-1 dark:text-gray-300" />
        </button>
      </div>
    </form>
  );
}
