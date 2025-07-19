import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-4 px-6 shadow-lg border-b border-gray-800 flex items-center justify-between">
      <Link to="/" className="font-semibold hover:underline text-lg">
        Home
      </Link>

      <div className="flex space-x-6 items-center">
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button className="hover:underline font-semibold">About</button>
          {open && (
            <div className="absolute top-full mt-2 bg-gray-800 text-white rounded shadow-lg w-36 z-50">
              <Link to="/aboutus" className="block px-4 py-2 hover:bg-gray-700">About Us</Link>
              <Link to="/faq" className="block px-4 py-2 hover:bg-gray-700">FAQ</Link>
              <Link to="/video" className="block px-4 py-2 hover:bg-gray-700">
                Project Video
            </Link>
            </div>
          )}
        </div>

        {token && (
          <>
            <Link to="/sms-check" className="font-semibold hover:underline">
              SMS Checker
            </Link>
            <Link to="/email-check" className="font-semibold hover:underline">
              Email Checker
            </Link>
            <Link to="/call-check" className="font-semibold hover:underline">
              Call Checker
            </Link>
          </>
        )}

        {/* ✅ Show login/signup if not logged in */}
        {!token ? (
          <>
            <Link to="/signup" className="font-semibold hover:underline">
              Signup
            </Link>
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out py-2 px-4 rounded-md shadow-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
