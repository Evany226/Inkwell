import {
  ClipboardDocumentListIcon,
  AdjustmentsVerticalIcon,
  PaperClipIcon,
  TrashIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidenav = () => {
  return (
    <aside className="bg-white flex-col justify-center items-center fixed border-r w-60 px-4 top-0 left-0 h-full z-2">
      <div className="flex justify-center ">
        <img src="../../full-logo.png" className="w-32 mr-6 my-6 mt-8"></img>
      </div>

      <ul className="relative flex-col items-center text-center w-full px-2 py h-full">
        <li className="flex items-center px-4 py-2 rounded-xl mt-2">
          <ClipboardDocumentListIcon className="w-8 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3 font-medium">Notes</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl mt-2">
          <AdjustmentsVerticalIcon className="w-8 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3 font-medium">Timeline</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl mt-2">
          <PaperClipIcon className="w-8 text-gray-800 " />
          <p className="text-lg text-gray-800 ml-3 font-medium">Resources</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl mt-2">
          <TrashIcon className="w-8 text-gray-800 " />
          <p className="text-lg text-gray-800 ml-3 font-medium">Trash</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl  mt-2">
          <Cog8ToothIcon className="w-8 text-gray-800 " />
          <p className="text-lg text-gray-800 ml-3 font-medium">Settings</p>
        </li>
        <li className="flex items-center px-4 py-2 rounded-xl mt-2">
          <ArrowLeftStartOnRectangleIcon className="w-8 text-red-700 " />
          <p className="text-lg text-red-700 ml-3 font-medium">Logout</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
