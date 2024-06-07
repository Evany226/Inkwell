import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { CheckBox } from "../../types/checkedType";

const EditPost = ({
  editNote,
  editHandleChange,
  setEditOpen,
  newContent,
  newTags,
  handleEditTags,
  newTagValue,
  addEditTags,
  removeEditTags,
  cancelEdit,
  newCode,
  setNewCode,
  newCheckList,
  newCheckValue,
  addEditCheck,
  handleEditCheck,
  removeEditCheck,
  setChecked,
}: {
  editNote(e: React.FormEvent<HTMLFormElement>): void;
  editHandleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  setEditOpen(arg: boolean): void;
  newContent: string;
  newTags: string[];
  handleEditTags(e: React.ChangeEvent<HTMLInputElement>): void;
  newTagValue: string;
  addEditTags(e: React.KeyboardEvent<HTMLInputElement>): void;
  removeEditTags(arg: string): void;
  cancelEdit(): void;
  newCode: string;
  setNewCode(arg: string): void;
  newCheckList: CheckBox[];
  newCheckValue: string;
  addEditCheck(e: React.KeyboardEvent<HTMLInputElement>): void;
  handleEditCheck(e: React.ChangeEvent<HTMLInputElement>): void;
  removeEditCheck(arg: string): void;
  setChecked(arg: CheckBox[]): void;
}) => {
  return (
    <div className="min-w-[30rem] bg-white z-20 fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 flex-col">
      <form
        className="flex-col py-2"
        id="my-form"
        onSubmit={(e) => {
          editNote(e), setEditOpen(false);
          setChecked(newCheckList);
        }}
      >
        <h1 className="text-black text-lg font-semibold ml-1 mt-2">
          Edit note
        </h1>
        <textarea
          className="bg-slate-100 w-full mt-2 p-1 resize-none rounded-md outline-none border text-sm"
          rows={2}
          placeholder="Change your note..."
          autoFocus
          onFocus={(e) => e.currentTarget.select()}
          value={newContent}
          onChange={editHandleChange}
        ></textarea>
      </form>

      <div className="flex flex-col justify-center w-full px-1 ">
        {newCheckList.map((item) => (
          <div className="flex items-center mb-2 outline-none">
            <input
              disabled
              type="checkbox"
              className="w-4 h-4 border-gray-500"
            ></input>
            <label className="ms-2 text-base text-black font-normal">
              {item.listItem}
            </label>
            <XMarkIcon
              className="w-4 text-gray-600 ml-1 cursor-pointer mt-0.5"
              onClick={() => removeEditCheck(item.listId)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center w-full mt-2 px-2 py-1 bg-white border border-gray-400 rounded-md space-x-2">
        <input
          type="text"
          className="w-full bg-white outline-none px-0 py-1 w-32 text-sm "
          placeholder="Enter checklist items.."
          value={newCheckValue}
          onChange={handleEditCheck}
          onKeyDown={addEditCheck}
        ></input>
      </div>

      <div className="w-full flex mt-2">
        <CodeMirror
          value={newCode}
          theme={tokyoNight}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setNewCode(value)}
          style={{
            width: "100%",
            marginTop: "0.25rem",
            fontSize: "0.875rem",
          }}
        />
      </div>

      <div className="flex items-center w-full px-2 py-1 bg-white border border-gray-400 rounded-md space-x-2 mt-3">
        {newTags.map((tag) => (
          <div
            className="text-sm flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md"
            key={tag}
          >
            <p>{tag}</p>
            <XMarkIcon
              className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500 "
              onClick={() => removeEditTags(tag)}
            />
          </div>
        ))}
        <input
          type="text"
          className="resize-none bg-white outline-none px-0 py-1 w-32 text-sm"
          placeholder="Enter tags.."
          value={newTagValue}
          onChange={handleEditTags}
          onKeyDown={addEditTags}
        ></input>
      </div>

      <div className="flex justify-between items-center py-1 ">
        <p className="text-sm ml-1 text-gray-700">
          {Math.max(5 - newTags.length, 0)} tags remaining
        </p>
        <div className="flex items-center py-3">
          <button
            onClick={cancelEdit}
            className="flex justify-center items-center bg-red-300 hover:bg-red-400 py-1 px-2 rounded-md border border-red-400"
          >
            <p className="text-sm font-medium text-red-800">Cancel</p>
          </button>
          <button
            form="my-form"
            type="submit"
            className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border outline-none ml-2"
          >
            <p className="text-sm font-medium text-gray-700">Save</p>
            <PlusCircleIcon className="w-4 text-gray-600 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
