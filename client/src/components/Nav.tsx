const Nav = () => {
  return (
    <>
      <nav className="flex justify-between items-center w-full h-16 bg-slate-100 px-32 pt-4">
        <img src="../../full-logo.png" className="w-32"></img>
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
