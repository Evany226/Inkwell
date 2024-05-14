import { CheckCircleIcon } from "@heroicons/react/24/outline";

const Success = ({
  message,
  setSuccessMsg,
}: {
  message: string;
  setSuccessMsg: (val: string) => void;
}) => {
  if (message == "") {
    return null;
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-pulse flex items-center">
      <span className="">
        <CheckCircleIcon className="w-6" />
      </span>
      <span className="block sm:inline ml-2">Created successfully.</span>
      <span className="ml-1">
        <svg
          className="fill-current h-6 w-6 text-green-700"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setSuccessMsg("")}
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
};

export default Success;
