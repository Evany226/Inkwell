import Sidenav from "../components/Sidenav";
import { auth } from "../config/firebase";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import EditSettings from "../components/settings/EditSettings";

const Settings = () => {
  const user = auth.currentUser;
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSetup = () => {
    setEditOpen(true);
    const displayName = user?.displayName;
    const emailAddr = user?.email;
    if (displayName && emailAddr) {
      setUsername(displayName);
      setEmail(emailAddr);
    }
  };

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
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          setEditOpen={setEditOpen}
        />
      ) : null}
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center bg-gray-100">
          <section className="w-full max-w-5xl px-4 flex p-6 mb-0 pb-0">
            <div className="w-[calc(100%-16rem)] h-full bg-white rounded-lg border py-6 px-8 flex flex-col space-y-5">
              <h1 className="text-xl font-semibold text-gray-800">Settings</h1>

              <div className="w-full flex-col ">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-base font-medium">Account Information</h2>
                  <button
                    className="flex cursor-pointer items-center"
                    onClick={handleSetup}
                  >
                    <p className="text-sm">Edit </p>
                    <PencilSquareIcon className="w-4 ml-1 text-gray-600" />
                  </button>
                </div>
                <div className="flex flex-col bg-gray-50 px-4 py-2 border rounded-md space-y-2 ">
                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Username:
                    </label>
                    <p className="text-[0.9rem] font-normal">
                      {user?.displayName}
                    </p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Email Address:
                    </label>
                    <p className="text-[0.9rem] font-normal">{user?.email}</p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Phone Number:
                    </label>
                    <p className="text-[0.9rem] font-normal">
                      {user?.phoneNumber ? user?.phoneNumber : "None"}
                    </p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Password
                    </label>
                    <p className="text-[0.9rem] font-normal">••••••••</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex-col ">
                <h2 className="text-base font-medium mb-2">Preferences</h2>
                <div className="flex flex-col bg-gray-50 px-4 py-2 border rounded-md space-y-2 ">
                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Theme:
                    </label>
                    <p className="text-[0.9rem] font-normal">Light</p>
                  </div>

                  <div className="flex">
                    <label className="text-[0.9rem] mr-2 font-medium text-gray-600">
                      Language:
                    </label>
                    <p className="text-[0.9rem] font-normal">English</p>
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
