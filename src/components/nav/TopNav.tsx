import { Bars3Icon } from "@heroicons/react/16/solid";

const TopNav = ({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean;
  setNavOpen(arg: boolean): void;
}) => {
  return (
    <nav className="w-full px-6 pt-3 pb-0 hidden xs:flex xs:justify-between xs:items-center ">
      <div>
        <h1 className="font-bold text-gray-800 text-lg dark:text-gray-300">
          Inkwell
        </h1>
      </div>

      <div onClick={() => setNavOpen(!navOpen)}>
        <Bars3Icon className="w-6 text-gray-800 dark:text-gray-300" />
      </div>
    </nav>
  );
};

export default TopNav;
