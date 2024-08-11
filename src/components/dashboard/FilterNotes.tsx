import { XMarkIcon } from "@heroicons/react/24/outline";

interface FilterNotesProps {
  selectedTags: string[];
  setSelectedTags(arg: string[]): void;
  unfilterTags(arg: string): void;
}

export function FilterNotes({
  selectedTags,
  setSelectedTags,
  unfilterTags,
}: FilterNotesProps) {
  return (
    <>
      {selectedTags.length !== 0 ? (
        <div className="px-4 py-1 mt-4 w-full flex items-center">
          <p className="text-sm dark:text-white">Filters:</p>
          <div className="ml-3 w-full flex items-center gap-x-3">
            {selectedTags.map((tag) => {
              return (
                <div
                  className="flex items-center bg-white border border-gray-300 px-2 py-0.5 rounded cursor-pointer dark:bg-neutral-700 dark:border-zinc-700 dark:text-white"
                  key={tag}
                  onClick={() => unfilterTags(tag)}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {tag}
                  </p>
                  <XMarkIcon className="w-4 ml-1 text-gray-500 dark:text-white" />
                </div>
              );
            })}
            <button
              className="bg-red-300 px-3 py-0.5 rounded"
              onClick={() => {
                setSelectedTags([]);
              }}
            >
              <p className="text-sm text-red-800 font-medium">Reset</p>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
