import { XCircleIcon } from "@heroicons/react/16/solid";

const CheckListModal = ({
  setListOpen,
  listValue,
  listHandleChange,
  checkList,
  addList,
}: {
  setListOpen(arg: boolean): void;
  listValue: string;
  listHandleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  checkList: string[];
  addList(e: React.KeyboardEvent<HTMLInputElement>): void;
}) => {
  return (
    <div className="min-w-[30rem] bg-white z-20 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4 flex-col">
      <h1 className="text-black text-lg font-semibold ml-1 mt-2">
        Add a checklist
      </h1>
      <p className="text-black text-base ml-1 font-normal mt-1 mb-1 border-b-2 border-gray-300 pb-2">
        Press enter after each list item
      </p>
      <div className="flex flex-col w-full px-1 ">
        {checkList.map((item) => (
          <div className="flex items-center mb-4">

      </div>
        ))}
      </div>
      <div className="flex items-center w-full mt-2 px-2 py-1 bg-white border border-slate-700 rounded-md space-x-2">
        <input
          type="text"
          className="w-full bg-white outline-none px-0 py-1 w-32 text-sm"
          placeholder="Enter items.."
          value={listValue}
          onChange={listHandleChange}
          onKeyDown={addList}
        ></input>
      </div>
      <div className="flex justify-between items-center mt-2 py-1 ">
        <p className="text-sm ml-1 text-gray-700">5 characters remaining</p>
        <div className="flex items-center">
          <button
            onClick={() => setListOpen(false)}
            className="ml-2 flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border"
          >
            <p className="text-sm font-medium text-gray-700">Close</p>
            <XCircleIcon className="w-4 text-gray-700 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckListModal;
