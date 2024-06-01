import Sidenav from "../components/Sidenav";

const Settings = () => {
  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center bg-gray-100">
          <section className="w-full max-w-5xl px-4 flex p-6 mb-0 pb-0">
            <div className="w-[calc(100%-16rem)] h-full bg-white rounded-lg border py-6 px-8 flex flex-col space-y-5">
              <h1 className="text-xl font-semibold text-gray-800">Settings</h1>

              <div className="w-full flex-col">
                <h2 className="text-lg font-medium  mb-1">
                  Account information
                </h2>
                <div className="flex">
                  <label className="text-base mr-2 font-medium text-gray-600">
                    Username:
                  </label>
                  <p className="text-base font-normal">Evan Yang</p>
                </div>

                <div className="flex">
                  <label className="text-base mr-2 font-medium text-gray-600">
                    Email Address:
                  </label>
                  <p className="text-base font-normal">evany0226@gmail.com</p>
                </div>

                <div className="flex">
                  <label className="text-base mr-2 font-medium text-gray-600">
                    Password
                  </label>
                  <p className="text-base font-normal">••••••••</p>
                </div>
              </div>

              <div className="w-full flex-col">
                <h2 className="text-lg font-medium mb-1">Preferences</h2>

                <div className="flex">
                  <label className="text-base mr-2 font-medium text-gray-600">
                    Language:
                  </label>
                  <p className="text-base font-normal">English</p>
                </div>

                <div className="flex">
                  <label className="text-base mr-2 font-medium text-gray-600">
                    Theme:
                  </label>
                  <p className="text-base font-normal">Light</p>
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
