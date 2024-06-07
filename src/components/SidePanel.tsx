import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { Note } from "../types/noteType";

const SidePanel = ({
  notes,
  tagItems,
  filterTags,
}: {
  notes: Note[];
  tagItems: string[];
  filterTags(arg: string): void;
}) => {
  return (
    <div className="stick top-0 left-0 w-56 h-full xs:hidden">
      <section className="w-full flex py-1 px-2 rounded-lg bg-white border dark:bg-zinc-900 dark:border-zinc-700">
        <MagnifyingGlassIcon className="w-4 text-gray-500 py-1" />
        <input
          className="ml-1 1w-full outline-0 text-sm dark:bg-zinc-900"
          placeholder="Search notes..."
        ></input>
      </section>
      <section className="w-full bg-white mt-3 border rounded-lg px-3 py-2 flex flex-col dark:bg-zinc-900 dark:border-zinc-700">
        <h1 className="text-sm text-gray-500 font-semibold ">Statistics</h1>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <BookOpenIcon className="w-4 dark:text-gray-400" />
            <p className="text-sm ml-1 text-gray-700 dark:text-gray-400 ">
              Notes
            </p>
          </div>
          <p className="text-sm text-gray-700 mr-1 dark:text-gray-400">
            {notes.length}
          </p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <HashtagIcon className="w-4 dark:text-gray-400" />
            <p className="text-sm ml-1 text-gray-700 dark:text-gray-400 ">
              Tags
            </p>
          </div>
          <p className="text-sm text-gray-700 mr-1 dark:text-gray-400">
            {tagItems.length}
          </p>
        </div>
      </section>

      <section className="w-full bg-white mt-4 py-2 px-3 rounded-lg border dark:bg-zinc-900 dark:border-zinc-700">
        <h2 className="text-sm text-gray-500 font-semibold">Tags</h2>
        <div className="flex flex-wrap mt-1">
          {tagItems.length > 0 ? (
            tagItems.map((tag) => (
              <p
                className="text-sm text-gray-700 mr-2 mt-1 cursor-pointer dark:text-gray-400"
                onClick={() => filterTags(tag)}
                key={tag}
              >
                #{tag}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-700 ">None</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SidePanel;
