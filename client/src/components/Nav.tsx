const Nav = () => {
  return (
    <>
      <nav className="flex justify-between items-center w-full h-16 bg-slate-100 px-16">
        <div className="text-2xl text-zinc-900 font-semibold">Inkwell</div>
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
