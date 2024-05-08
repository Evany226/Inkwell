import {
  ClipboardDocumentListIcon,
  AdjustmentsVerticalIcon,
  PaperClipIcon,
  TrashIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-64">
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

        <main className="flex flex-col items-center justify-center flex-grow shrink w-full h-auto bg-gray-100">
          <section className="w-3/5 h-64 bg-black px-4 flex gap-4 p-6">
            <div className="w-[calc(100%-15rem)] bg-white h-12"></div>
            <div className="stick top-0 left-0 w-56 h-full bg-white"></div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
