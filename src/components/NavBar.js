import React from "react";
import { Link } from "react-router-dom";
import Theme from "../util/Theme";
import SearchBar from "./SearchBar";
import tesla from "../assets/tesla.png";

function NavBar() {
  return (
    <div className="navbar bg-base-200/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100/80 backdrop-blur-sm rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Shop">Shop</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="flex items-center">
          <img src={tesla} alt="Tesla Logo" className="h-5 w-auto mx-4" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-base">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Shop" className="text-base">
              Shop
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex gap-2 mx-5">
        <SearchBar />
        <Theme />
      </div>
    </div>
  );
}

export default NavBar;
