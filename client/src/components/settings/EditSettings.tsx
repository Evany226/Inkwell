import { XCircleIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const EditSettings = ({
  username,
  setUsername,
  email,
  setEmail,
  setEditOpen,
}: {
  username: string;
  setUsername(arg: string): void;
  email: string;
  setEmail(arg: string): void;
  setEditOpen(arg: boolean): void;
}) => {
  return (
    <div className="min-w-[30rem] bg-white z-20 fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4 flex-col space-y-4">
      <h1 className="text-black text-lg font-semibold ml-1 mt-2">
        Update Account Information
      </h1>

      <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 ">Username</p>
        <div className="flex items-center w-full mt-1 px-2 py-1 bg-white border border-slate-700 rounded-md space-x-2">
          <input
            type="text"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm"
            placeholder="RacoonMan67"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 ">
          Email Address
        </p>
        <div className="flex items-center w-full mt-1 px-2 py-0.5 bg-white border border-slate-700 rounded-md space-x-2">
          <input
            type="text"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm"
            placeholder="name@website.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 ">Password</p>
        <div className="flex items-center w-full mt-1 px-2 py-0.5 bg-white border border-slate-700 rounded-md space-x-2">
          <input
            type="text"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm"
            placeholder="Password"
          ></input>
        </div>
      </div>

      <div className="flex justify-end items-center mt-2 py-0.5 ">
        <div className="flex items-center">
          <button className="ml-2 flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border" onClick={() => setEditOpen(false)}>
            <p className="text-sm font-medium text-gray-700">Close</p>
            <XCircleIcon className="w-4 text-gray-700 ml-1" />
          </button>
          <button className="ml-2 flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border">
            <p className="text-sm font-medium text-gray-700">Save</p>
            <PlusCircleIcon className="w-4 text-gray-700 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSettings;
