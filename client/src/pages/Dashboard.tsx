import Sidenav from "../components/Sidenav";
import Post from "../components/Post";
import { useState, useEffect, useRef } from "react";
import {
  HashtagIcon,
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
          <section className="w-full max-w-7xl bg-gray-100 px-4 flex gap-4 p-6 mb-0 pb-0">
            <div className="w-[calc(100%-16rem)] h-full mb-8">
              <div className="rounded-lg w-full h-full flex flex-col justify-start items-start px-4 py-2 border bg-white">
                <div className="pb-2 flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit border-b ">
                  <textarea
                    className="w-full h-full my-2 ml-1 mt-5  text-lg resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break"
                    placeholder="Any thoughts..."
                    rows={1}
                    value={val}
                    onChange={(e) => handleChange(e)}
                    ref={textAreaRef}
                    style={{ color: "#000" }}
                  ></textarea>
                  <div className="flex items-center my-2">
                    <HashtagIcon className="w-7 text-gray-600 ml-1" />
                    <CodeBracketSquareIcon className="w-7 text-gray-600 ml-2" />
                    <PhotoIcon className="w-7 text-gray-600 ml-2" />
                    <DocumentCheckIcon className="w-7 text-gray-600 ml-2" />
                  </div>
                </div>
                <div className="w-full py-4 flex justify-between items-center">
                  <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border">
                    <BellAlertIcon className="w-5 text-gray-700" />
                    <p className="text-base font-medium text-gray-700 ml-2">
                      Reminders
                    </p>
                    <ChevronDoubleDownIcon className="w-5 text-gray-700 ml-2 mt-0.5" />
                  </button>
                  <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border">
                    <p className="text-base font-medium text-gray-700">Save</p>
                    <PlusCircleIcon className="w-6 text-gray-700 ml-1" />
                  </button>
                </div>
              </div>

              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
            <div className="stick top-0 left-0 w-64 h-full bg-white">
              <p className="h-48">Hello</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
