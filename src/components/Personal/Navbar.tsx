import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  return (
    <nav className="h-16 w-full flex items-center justify-between px-8 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer text-gray-900 dark:text-zinc-100"
        >
          EaseUi
        </h1>

        <div className="hidden sm:flex items-center bg-gray-50 dark:bg-zinc-900 rounded-md px-3 py-1.5 border border-gray-200 dark:border-zinc-800 transition-colors">
          <Search size={18} className="text-gray-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm text-gray-700 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-500"
          />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-gray-600 dark:text-zinc-400">
        <li
          onClick={() => navigate("components")}
          className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
        >
          Components
        </li>
        <li className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">About</li>
        <li className="cursor-pointer hover:text-black dark:hover:text-white transition-colors">Templates</li>
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} className="text-gray-600 dark:text-zinc-400" />
          </li>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-gray-700 dark:text-zinc-300">☰</button>
    </nav>
  );
};

export default Navbar;
