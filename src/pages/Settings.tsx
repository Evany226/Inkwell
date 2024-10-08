import Sidenav from "../components/nav/Sidenav";
import { auth } from "../config/firebase";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import {
  updateProfile,
  updateEmail,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import EditSettings from "../components/settings/EditSettings";
import ThemeSwitch from "../components/settings/ThemeSwitch";

const Settings = () => {
  const authTest = getAuth();
  const authUser = authTest.currentUser;

  const [editOpen, setEditOpen] = useState<boolean>(false);

  //what's actually displayed on screen and triggers component refresh
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  const handleSetup = () => {
    setEditOpen(true);
    setNewName(username);
    setNewEmail(email);
  };

  const updateAccount = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const updateData = async () => {
      if (authUser) {
        await updateProfile(authUser, {
          displayName: newName,
        });
        await updateEmail(authUser, newEmail);
        setEditOpen(false);
      }
    };
    updateData();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("uid", user.uid);
        if (user.displayName) {
          setUsername(user.displayName);
        }

        if (user.email) {
          setEmail(user.email);
        }
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <div className="w-full min-h-full">
      {editOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
          onClick={() => setEditOpen(false)}
        ></div>
      ) : null}

      {editOpen ? (
        <EditSettings
          newName={newName}
          setNewName={setNewName}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          setEditOpen={setEditOpen}
          updateAccount={updateAccount}
        />
      ) : null}
      <div className="w-full transition-all mx-auto flex flex-col justify-center items-center pl-60 xs:pl-0 sm:pl-0">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
          <section className="w-full max-w-5xl px-4 flex p-6 mb-0 pb-0 ">
            <div className="w-[80%] h-full bg-white rounded-lg border py-6 px-8 flex flex-col space-y-5 dark:bg-zinc-800 dark:border-zinc-700 xs:w-full sm:w-full">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                Settings
              </h1>

              <div className="w-full flex-col ">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-medium dark:text-gray-400">
                    Account Information
                  </h2>
                  <button
                    className="flex cursor-pointer items-center"
                    onClick={handleSetup}
                  >
                    <p className="text-sm dark:text-gray-300">Edit </p>
                    <PencilSquareIcon className="w-4 ml-1 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                <div className="flex flex-col bg-gray-50 px-4 py-2 border rounded-md space-y-2 dark:bg-zinc-900 dark:border-zinc-700">
                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600 dark:text-gray-400">
                      Username:
                    </label>
                    <p className="text-[0.9rem] font-normal dark:text-gray-300">
                      {authUser?.displayName}
                    </p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600 dark:text-gray-400">
                      Email:
                    </label>
                    <p className="text-[0.9rem] font-normal dark:text-gray-300">
                      {authUser?.email}
                    </p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600 dark:text-gray-400">
                      Phone Number:
                    </label>
                    <p className="text-[0.9rem] font-normal dark:text-gray-300">
                      {authUser?.phoneNumber ? authUser?.phoneNumber : "None"}
                    </p>
                  </div>

                  {/* <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Password
                    </label>
                    <p className="text-[0.9rem] font-normal">••••••••</p>
                  </div> */}
                </div>
              </div>

              <div className="w-full flex-col ">
                <h2 className="text-base font-medium mb-2 dark:text-gray-400">
                  Preferences
                </h2>
                <div className="flex flex-col bg-gray-50 px-4 py-2 border rounded-md space-y-2 dark:bg-zinc-900 dark:border-zinc-700">
                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600 dark:text-gray-400">
                      Dark Theme:
                    </label>
                    <p className="text-[0.9rem] font-normal dark:text-gray-300"></p>
                    <ThemeSwitch />
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600 dark:text-gray-400">
                      Language:
                    </label>
                    <p className="text-[0.9rem] font-normal dark:text-gray-300">
                      English
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;
