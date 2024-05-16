import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";

const SidePanel = ({ notesLen }: { notesLen: number }) => {
  return (
    <div className="stick top-0 left-0 w-56 h-full bg-slate-100">
      <section className="w-full flex py-1 px-2 rounded-lg bg-white border">
        <MagnifyingGlassIcon className="w-4 text-gray-500 py-1" />
        <input
          className="ml-1 1w-full outline-0 text-sm"
          placeholder="Search notes..."
        ></input>
      </section>
      <section className="w-full bg-white mt-2 border rounded-lg px-3 py-2 flex flex-col">
        <h1 className="text-sm text-gray-500 font-semibold ">Statistics</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <BookOpenIcon className="w-4" />
            <p className="text-sm ml-1 text-gray-500 ">Notes</p>
          </div>
          <p className="text-sm text-gray-500 mr-1">{notesLen}</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <HashtagIcon className="w-4" />
            <p className="text-sm ml-1 text-gray-500 ">Tags</p>
          </div>
          <p className="text-sm text-gray-500 mr-1">2</p>
        </div>
      </section>
    </div>
  );
};

export default SidePanel;
