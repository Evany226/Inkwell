const Nav = () => {
  return (
    <>
      <nav className="flex justify-between items-center w-full h-16 bg-slate-100 px-32 pt-4">
        <div className="flex items-center">
          <div className="w-12 h-12">
            <img className="w-full h-auto" src="../../clear.png"></img>
          </div>
          <h1 className="text-4xl font-bold font-DancingScript ml-2">
            Inkwell
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-normal text-base text-zinc-800 font-semibold px-2">
            Login
          </div>
          <div className="text-normal text-base text-zinc-800 font-semibold px-2">
            Signup
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
