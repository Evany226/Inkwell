const MobileNav = ({ navOpen }: { navOpen: boolean }) => {
  return (
    <div
      className={`h-full bg-gray-50 border w-2/3 duration-300 absolute ease-in-out z-10 top-0 left-0 ${
        navOpen ? "" : "w-0"
      }`}
    ></div>
  );
};

export default MobileNav;
