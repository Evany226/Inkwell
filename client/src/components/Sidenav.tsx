import {
  ClipboardDocumentListIcon,
  AdjustmentsVerticalIcon,
  TrashIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Sidenav = () => {
  const navigate = useNavigate();

  const user = auth.currentUser;

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
    <aside className="bg-gray-50 flex-col justify-center items-center fixed border-r w-60 px-4 top-0 left-0 h-full z-2">
      <div className="flex items-center ml-4 mt-10">
        <div className="w-9 h-9 bg-gray-200 rounded-xl ">
          <img src="../../logo-clear.png" className="w-full h-auto"></img>
        </div>
        <div className=" text-lg font-semibold ml-2 font-MeowScript">
          {user?.displayName}
        </div>
      </div>

      <ul className="relative flex-col items-center text-center w-full px-2 h-full mt-4">
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border"
                  : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent"
              }
            >
              <ClipboardDocumentListIcon className="w-8 text-gray-800" />
              <p className="text-lg text-gray-800 ml-3 font-medium">Notes</p>
            </li>
          )}
        </NavLink>

        <NavLink to="/timeline">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border"
                  : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent"
              }
            >
              <AdjustmentsVerticalIcon className="w-8 text-gray-800" />
              <p className="text-lg text-gray-800 ml-3 font-medium">Timeline</p>
            </li>
          )}
        </NavLink>

        <NavLink to="/trash">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border"
                  : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent"
              }
            >
              <TrashIcon className="w-8 text-gray-800 " />
              <p className="text-lg text-gray-800 ml-3 font-medium">Trash</p>
            </li>
          )}
        </NavLink>

        <NavLink to="/settings">
          {({ isActive }) => (
            <li
              className={
                isActive
                  ? "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-white border"
                  : "flex items-center px-4 py-2 rounded-2xl mt-2 cursor-pointer bg-gray-50 border border-transparent"
              }
            >
              <Cog8ToothIcon className="w-8 text-gray-800 " />
              <p className="text-lg text-gray-800 ml-3 font-medium">Settings</p>
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
    </aside>
  );
};

export default Sidenav;
