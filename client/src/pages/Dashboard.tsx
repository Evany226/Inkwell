import Sidenav from "../components/Sidenav";
import { useState, useEffect, useRef } from "react";
import {
  TagIcon,
  CodeBracketSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  PlusCircleIcon,
  BellAlertIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [val, setVal] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [val]);

  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100">
          <section className="h-60 w-4/5 bg-slate-400 px-4 flex gap-4 p-6">
            <div className="w-[calc(100%-15rem)]">
              <div className="rounded-md mb-1 w-full flex flex-col justify-start items-start bg-white px-4 py-2 border border-gray-100 ">
                <div className="pb-2 flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit border-b ">
                  <textarea
                    className="w-full h-full my-2 text-[0.95rem] resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break"
                    placeholder="Any thoughts..."
                    rows={1}
                    value={val}
                    onChange={(e) => handleChange(e)}
                    ref={textAreaRef}
                    style={{ color: "#000" }}
                  ></textarea>
                  <div className="flex items-center mt-1">
                    <TagIcon className="w-6 text-gray-600 ml-2" />
                    <CodeBracketSquareIcon className="w-6 text-gray-600 ml-2" />
                    <PhotoIcon className="w-6 text-gray-600 ml-2" />
                    <DocumentCheckIcon className="w-6 text-gray-600 ml-2" />
                  </div>
                </div>
                <div className="w-full pt-3 pb-1 flex justify-between items-center">
                  <button className="flex justify-center items-center bg-gray-100 py-1 px-2 rounded-md border">
                    <BellAlertIcon className="w-5 text-gray-700" />
                    <p className="text-sm font-medium text-gray-700 ml-2">
                      Reminders
                    </p>
                    <ChevronDoubleDownIcon className="w-4 text-gray-700 ml-2 mt-0.5" />
                  </button>
                  <button className="flex justify-center items-center bg-gray-200 py-1 px-2 rounded-md border">
                    <p className="text-sm font-medium text-gray-700">Save</p>
                    <PlusCircleIcon className="w-5 text-gray-700 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            <div className="stick top-0 left-0 w-56 h-full bg-white"></div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
