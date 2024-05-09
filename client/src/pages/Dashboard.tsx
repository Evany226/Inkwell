import Sidenav from "../components/Sidenav";

const Dashboard = () => {
  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-64">
        <Sidenav />
        <main className="flex flex-col items-center justify-center w-full h-auto shrink bg-gray-100">
          <section className="w-3/5 h-[30vh] bg-black px-4 flex gap-4 p-6">
            <div className="w-[calc(100%-15rem)] bg-white rounded-md">
              <div className="mb-2 w-full flex flex-col justify-start items-start bg-white px-4 pt-4 rounded-lg border border-gray-100 ">
                <div className="flex flex-col justify-start items-start w-full">
                  <textarea
                    className="w-full my-1 text-base resize-none bg-white outline-none whitespace-pre-wrap word-break"
                    placeholder="Take a note"
                  ></textarea>
                </div>
                <div>Hello</div>
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
