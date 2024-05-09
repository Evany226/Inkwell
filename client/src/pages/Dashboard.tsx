import Sidenav from "../components/Sidenav";
import { useState, useEffect, useRef } from "react";

const Dashboard = () => {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [val]);

  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-64">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100">
          <section className="h-64 w-3/5 bg-black px-4 flex gap-4 p-6">
            <div className="w-[calc(100%-15rem)]">
              <div className="rounded-xl mb-2 w-full flex flex-col justify-start items-start bg-white px-4 py-4 rounded-lg border border-gray-100 ">
                <div className="flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit ">
                  <textarea
                    className="w-full h-full my-1 text-base resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break"
                    placeholder="Take a note"
                    rows={1}
                    value={val}
                    onChange={(e) => handleChange(e)}
                    ref={textAreaRef}
                  ></textarea>
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
