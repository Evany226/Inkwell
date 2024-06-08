import { NavLink } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  TrashIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  // BellAlertIcon,
} from "@heroicons/react/24/outline";

const MobileNav = ({ navOpen }: { navOpen: boolean }) => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <main
      className={` h-full bg-gray-50 border duration-300 absolute ease-in-out z-10 top-0 left-0 dark:bg-[#1e1e21] dark:border-zinc-800 ${
        navOpen ? "w-2/3" : "w-0 border-0"
      }`}
    >
      <div
        className={`ease-in-out duration-300 ${navOpen ? "block" : "hidden"}`}
      >
        <div
          className={`flex items-center ml-4 mt-10 ${
            navOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-9 h-9 bg-gray-200 rounded-xl dark:bg-zinc-900">
            <img src="../../logo-clear.png" className="w-full h-auto"></img>
          </div>
          <div className=" text-lg font-semibold ml-2 font-MeowScript dark:text-gray-300">
            {user?.displayName}
          </div>
        </div>

        <ul className="relative flex-col items-center text-center w-full px-2 h-full mt-4">
          <NavLink to="/dashboard">
            {({ isActive }) => (
              <li
                className={
                  isActive
                    ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border dark:bg-zinc-800 dark:border-zinc-700"
                    : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent dark:bg-[#1e1e21] "
                }
              >
                <ClipboardDocumentListIcon className="w-8 text-gray-800 dark:text-gray-400" />
                <p className="text-lg text-gray-800 ml-3 font-medium dark:text-gray-400">
                  Notes
                </p>
              </li>
            )}
          </NavLink>

          {/* <NavLink to="/reminders">
      {({ isActive }) => (
        <li
          className={
            isActive
              ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border"
              : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent"
          }
        >
          <BellAlertIcon className="w-8 text-gray-800" />
          <p className="text-lg text-gray-800 ml-3 font-medium">
            Reminders
          </p>
        </li>
      )}
    </NavLink> */}

          <NavLink to="/trash">
            {({ isActive }) => (
              <li
                className={
                  isActive
                    ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border dark:bg-zinc-800 dark:border-zinc-700"
                    : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent dark:bg-[#1e1e21]"
                }
              >
                <TrashIcon className="w-8 text-gray-800 dark:text-gray-400" />
                <p className="text-lg text-gray-800 ml-3 font-medium dark:text-gray-400">
                  Trash
                </p>
              </li>
            )}
          </NavLink>

          <NavLink to="/settings">
            {({ isActive }) => (
              <li
                className={
                  isActive
                    ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border dark:bg-zinc-800 dark:border-zinc-700"
                    : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent dark:bg-[#1e1e21]"
                }
              >
                <Cog8ToothIcon className="w-8 text-gray-800 dark:text-gray-400" />
                <p className="text-lg text-gray-800 ml-3 font-medium dark:text-gray-400">
                  Settings
                </p>
              </li>
            )}
          </NavLink>

          <li
            className="flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer"
            onClick={handleLogout}
          >
            <ArrowLeftStartOnRectangleIcon className="w-8 text-red-700" />
            <p className="text-lg text-red-700 ml-3 font-medium">Logout</p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default MobileNav;
