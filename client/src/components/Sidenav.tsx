import {
  ClipboardDocumentListIcon,
  AdjustmentsVerticalIcon,
  PaperClipIcon,
  TrashIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidenav = ({ handleLogout }: { handleLogout(): void }) => {
  return (
    <aside className="bg-gray-50 flex-col justify-center items-center fixed border-r w-60 px-4 top-0 left-0 h-full z-2">
      <div className="flex items-center px-6 mt-10">
        <div className="w-9 h-9 bg-gray-200 rounded-xl ">
          <img src="../../logo-clear.png" className="w-full h-auto"></img>
        </div>
        <div className=" text-lg font-semibold ml-2 font-MeowScript">
          Evan Yang
        </div>
      </div>

      <ul className="relative flex-col items-center text-center w-full px-2 h-full mt-4">
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
        <li
          className="flex items-center px-4 py-2 rounded-xl mt-2 cursor-pointer"
          onClick={handleLogout}
        >
          <ArrowLeftStartOnRectangleIcon className="w-8 text-red-700 " />
          <p className="text-lg text-red-700 ml-3 font-medium">Logout</p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
