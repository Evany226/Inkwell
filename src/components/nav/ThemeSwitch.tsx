import { useTheme } from "../../functions/useTheme";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <label className="inline-flex items-center cursor-pointer ml-2">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={toggleTheme}
          checked={theme === "dark" ? true : false}
          readOnly
        ></input>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
};

export default ThemeSwitch;
