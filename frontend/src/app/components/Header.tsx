import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold">Redux Blog</h2>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/post" className="hover:text-gray-300">
                Post
              </Link>
            </li>
            <li>
              <Link to="/user" className="hover:text-gray-300">
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
