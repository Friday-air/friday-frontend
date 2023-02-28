import "../../App.css";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSwipeable } from "react-swipeable";
import Topbar from "../../components/Topbar";
function App() {
  const navigate = useNavigate();

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Up") {
        const sidenav = document.querySelector(".sidenav");
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        sidenav.classList.add("active");
      } else {
        const sidenav = document.querySelector(".sidenav");
        sidenav.classList.remove("active");
      }
    },
    ...config,
  });

  useEffect(() => {
    // console.log(navigator.userAgent);
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
  }, []);

  return (
    <div className="relative h-screen">
      {/* <Topbar page_title="" /> */}
      <div>
        <div
          onClick={() => navigate("/user/search")}
          className="absolute h-[100%] w-[100%]"
        >
          <h3 className=" text-gray-300  text-2xl p-5 cursor-pointer absolute bottom-[55%]">
            Tap to search or ask
          </h3>
        </div>
      </div>

      <div className="bg-white sidenav">
        <div className="p-3">
          <ul className="text-sm">
            <li
              onClick={() => navigate("/user/apps")}
              className="mb-4 flex justify-between text-gray-500"
            >
              <div className="flex gap-1">
                <MdSpaceDashboard className="p-1 text-3xl" />
                <span className="p-1">My Apps</span>
              </div>
            </li>
            <li
              onClick={() => navigate("/user/apps/new-list")}
              className="mb-4 flex justify-between text-gray-500"
            >
              <div className="flex gap-1">
                <MdSpaceDashboard className="p-1 text-3xl" />
                <span className="p-1">Add New App</span>
              </div>
            </li>

            <li
              onClick={() => navigate("/user/dashboard")}
              className="mb-4 flex justify-between text-gray-500"
            >
              <div className="flex gap-1">
                <TbBrandBooking className="p-1 text-3xl" />
                <span className="p-1">Marketplace</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
