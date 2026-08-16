import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu } from "lucide-react";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

  return (
    <div className="flex min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-[#09090b]">
      <aside
        className={`
          w-64 p-6 flex flex-col
          border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-[#09090b]
          fixed md:static top-0 left-0 h-full z-20
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
      >
        <h2 className="text-md font-bold mb-6 text-gray-900 dark:text-white">
          Components
        </h2>
        <ul className="flex flex-col gap-2">
          {components.map((item) => {
            const isActive = location.pathname === `/components/${item.toLowerCase()}`;
            return (
              <li
                onClick={() => navigate(item.toLowerCase())}
                key={item}
                className={`cursor-pointer text-md hover:translate-x-1 transition-all duration-200 ease-in-out ${
                  isActive
                    ? "text-black dark:text-white font-bold"
                    : "text-gray-400 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="flex-1 ml-10 overflow-auto h-screen p-6 bg-white dark:bg-[#09090b]">
        <button
          className="md:hidden mb-4 text-gray-700 dark:text-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
