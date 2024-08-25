import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="./cornerstone-logo.png"
            className="h-8"
            alt="cornerstone logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            DıcomViewer
          </span>
        </Link>

        <div className="block w-auto">
          <ul className="font-medium flex   p-0   rounded-lg bg-gray-700 flex-row space-x-8 rtl:space-x-reverse mt-0 border-0  border-gray-700">
            <li>
              <NavLink
                to={"/"}
                className="block py-2 px-3 text-white hover:bg-blue-700 rounded"
              >
                Anasayfa
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
