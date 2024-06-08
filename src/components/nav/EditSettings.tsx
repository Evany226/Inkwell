import { PlusCircleIcon } from "@heroicons/react/16/solid";

const EditSettings = ({
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  setEditOpen,
  updateAccount,
}: {
  newName: string;
  setNewName(arg: string): void;
  newEmail: string;
  setNewEmail(arg: string): void;
  setEditOpen(arg: boolean): void;
  updateAccount(event: React.ChangeEvent<HTMLFormElement>): void;
}) => {
  return (
    <form
      onSubmit={updateAccount}
      className="min-w-[30rem] bg-white z-20 fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-md px-4 py-4 flex-col space-y-4 dark:bg-zinc-800 dark:border-zinc-700"
    >
      <h1 className="text-black text-lg font-semibold ml-1 mt-2 dark:text-gray-300">
        Update Account Information
      </h1>

      <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 dark:text-gray-400">
          Username
        </p>
        <div className="flex items-center w-full mt-1 px-2 py-1 bg-white border border-slate-700 rounded-md space-x-2 dark:bg-zinc-900">
          <input
            type="text"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm dark:bg-zinc-900 dark:text-gray-300"
            placeholder="RacoonMan67"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 dark:text-gray-400">
          Email Address
        </p>
        <div className="flex items-center w-full mt-1 px-2 py-0.5 bg-white border border-slate-700 rounded-md space-x-2 dark:bg-zinc-900">
          <input
            type="email"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm dark:bg-zinc-900 dark:text-gray-300"
            placeholder="name@website.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
        </div>
      </div>

      {/* <div className="flex-col">
        <p className="text-black text-base ml-1 font-medium mt-1 ">Password</p>
        <div className="flex items-center w-full mt-1 px-2 py-0.5 bg-white border border-slate-700 rounded-md space-x-2">
          <input
            type="text"
            className="w-full bg-white outline-none px-0 py-1 w-32 text-sm"
            placeholder="Password"
          ></input>
        </div>
      </div> */}

      <div className="flex justify-end items-center mt-2 py-0.5 ">
        <div className="flex items-center">
          <button
            onClick={() => setEditOpen(false)}
            className="flex justify-center items-center bg-red-300 hover:bg-red-400 py-1 px-2 rounded-md border border-red-400 border-0 dark:bg-red-600 dark:hover:bg-red-400"
          >
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              Cancel
            </p>
          </button>
          <button
            type="submit"
            className="ml-2 flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border border-gray-400 dark:bg-zinc-950 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Save
            </p>
            <PlusCircleIcon className="w-4 text-gray-700 ml-1 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditSettings;
