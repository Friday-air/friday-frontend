import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../store/auth-slice";
import { useGetOptionsQuery } from "../store/options-slice";
import Preloader from "./Preloader";

export default function Topbar({ page_title }) {
  const [showTopMenu, setShowTopMenu] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { data: options } = useGetOptionsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logOut());
    toast.success("Logout Successfully.");
    navigate("/login");
  };
  return user ? (
    <header className="flex justify-between p-2">
      {page_title == "" ? (
        <div className="p-3">
          <img src={options?.LOGO} alt="logo" className="h-10" />
        </div>
      ) : (
        <>
          <div
            className="p-2 h-10 w-10 text-center rounded bg-white"
            onClick={() => navigate("/user/dashboard")}
          >
            <IoIosArrowBack className="p-1 text-2xl font-extrabold text-gray-600" />
          </div>
          <div className="font-semibold p-3">{page_title}</div>
        </>
      )}

      <div className="relative">
        <button
          onClick={() => setShowTopMenu(showTopMenu ? false : true)}
          className="cursor-pointer"
        >
          <img
            src={user?.avatar ? user.avatar : options?.DEFAULT_AVATAR}
            alt="user"
            className="h-10 w-10 rounded-full object-cover"
          />
        </button>
        <ul
          className={`dropdown-menu bg-white absolute text-gray-700  right-3 whitespace-nowrap rounded pb-4 ${
            showTopMenu ? "block" : "hidden"
          }`}
        >
          <li className="flex justify-betwee  p-4 border-b ">
            <div className="flex gap-1">
              <img
                src={user?.avatar ? user.avatar : options?.DEFAULT_AVATAR}
                alt="user"
                className="h-10 w-10 rounded object-cover"
              />
              <div className="ml-2">
                <p className="font-bold text-md uppercase">{user.name}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          </li>
          <li
            onClick={() => navigate("/user/settings")}
            className="flex justify-between text-gray-500 p-1 px-4 cursor-pointer hover:text-blue-400"
          >
            <div className="flex gap-1">
              <span className="p-1 text-sm font-semibold">Settings</span>
            </div>
          </li>
          <li
            onClick={() => navigate("/user/support")}
            className="flex justify-between text-gray-500 p-1 px-4 cursor-pointer hover:text-blue-400"
          >
            <div className="flex gap-1">
              <span className="p-1 text-sm font-semibold">Get Help</span>
            </div>
          </li>
          <li
            onClick={() => logoutHandler()}
            className="flex justify-between text-gray-500 p-1 px-4 cursor-pointer hover:text-blue-400"
          >
            <div className="flex gap-1">
              <span className="p-1 text-sm font-semibold">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </header>
  ) : (
    <Preloader />
  );
}
