import Nav from "../components/Nav";

const Home = () => {
  return (
    <div className="bg-gray-100 h-screen flex-col items-center justify-center">
      <Nav />
      <section className="bg-gray-100 flex-col justify-center items-center w-full py-6">
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="text-5xl font-semibold text-center max-w-2xl pt-16">
            An effortless, lightweight, note-taking service
          </h2>
          <p className="text-xl font-medium py-6">
            Remember Everything, Anytime, Anywhere: Your Notes, Your World.
          </p>
          <div className="p-1 flex">
            <button className="bg-violet-700 text-white w-32 py-2 rounded-md shadow-lg flex flex-row justify-center items-center hover:bg-violet-900">
              Get Started
            </button>
            <button className="bg-gray-100 text-black w-28 py-2">Github</button>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 flex flex-col justify-center items-center pt-8 pb-6 w-full px-32">
        <h3 className="text-2xl font-medium text-zinc-600">Features</h3>
        <div className="bg-gray-100 w-full my-8 grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 sm:px-12">
          <div>
            <p className="text-xl py-2">Privacy First</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>

          <div>
            <p className="text-xl py-2">Plain text with Markdown</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>

          <div>
            <p className="text-xl py-2">Lightweight and powerful</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>

          <div>
            <p className="text-xl py-2">Privacy First</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>

          <div>
            <p className="text-xl py-2">Plain text with Markdown</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>

          <div>
            <p className="text-xl py-2">Lightweight and powerful</p>
            <p>
              Keep your own data by yourself. All data generated at runtime is
              saved in the SQLite database file.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
