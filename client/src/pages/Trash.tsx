import Sidenav from "../components/sidenav/Sidenav";

const Trash = () => {
  return (
    <>
      <div className="w-full min-h-full">
        <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
          <Sidenav />
          <main className="w-full h-auto flex flex-col items-center justify-center bg-gray-100">
            <section className="w-full max-w-5xl px-4 flex p-6 mb-0 pb-0">
              <div className="w-[calc(100%-16rem)] h-full bg-white rounded-lg border py-6 px-8 flex flex-col space-y-2">
                <h1 className="text-xl font-semibold text-gray-800">Trash</h1>

                <div className="w-full flex-col ">
                  <h2 className="text-base text-gray-700 font-medium">
                    All items here will be deleted automatically in 30 days.
                  </h2>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Trash;
