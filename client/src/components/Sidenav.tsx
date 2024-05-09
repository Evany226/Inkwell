import {
  ClipboardDocumentListIcon,
  AdjustmentsVerticalIcon,
  PaperClipIcon,
  TrashIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";

const Sidenav = () => {
  return (
    <aside className="bg-white flex-col justify-center items-center fixed border-r w-64 px-4 top-0 left-0 h-full z-2">
      <img src="../../full-logo.png" className="w-28 ml-4 my-6 mt-8"></img>
      <ul className="flex-col items-center text-center w-full shrink-0 px-1 py">
        <li className="flex items-center px-4 py-2 rounded-xl border">
          <ClipboardDocumentListIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3">Notes</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl border mt-2">
          <AdjustmentsVerticalIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3">Timeline</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl border mt-2">
          <PaperClipIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3">Resources</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl border mt-2">
          <TrashIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3">Trash</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl border mt-2">
          <Cog8ToothIcon className="w-6 h-6 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3">Settings</p>
        </li>
      </ul>
      <div className="w-full grow h-auto flex flex-col justify-end items-start"></div>
    </aside>
  );
};

export default Sidenav;