import { Outlet } from "react-router";
import Navbar from "../components/Personal/Navbar";

type Props = {};

const HomeLayout = ({}: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
