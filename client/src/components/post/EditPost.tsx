import { PlusCircleIcon } from "@heroicons/react/24/outline";

const EditPost = () => {
  return (
    <div className="w-[30rem] bg-white z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 flex-col">
      <div className="flex-col border-b py-2">
        <h1 className="text-black text-lg font-semibold ml-1 mt-2">
          Edit note
        </h1>
        <textarea
          className="bg-slate-100 w-full mt-2 p-1 resize-none text-sm rounded-md outline-none"
          rows={2}
          placeholder="Change your note..."
        ></textarea>
      </div>
      <div className="flex justify-center py-3">
        <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border">
          <p className="text-sm font-medium text-gray-700">Save</p>
          <PlusCircleIcon className="w-6 text-gray-700 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default EditPost;