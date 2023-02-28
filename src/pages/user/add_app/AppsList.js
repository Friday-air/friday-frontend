import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useGetAppsQuery } from "../../../store/app-api-slice";
import { filterApps } from "../../../store/app-slice";
import { useDispatch } from "react-redux";

export default function AppsList() {
  const [search, setSearch] = useState("");
  const [selected_app, setSelectedApp] = useState(null);
  const { data: apps, isLoading } = useGetAppsQuery();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNext = async (id) => {
    setSelectedApp(id);
    navigate(`/user/apps/new-list/${id}`);
  };

  //search
  const searchChange = (value) => {
    setSearch(value);
    const search_res = apps.data.filter((app) => {
      if (app.name.toLowerCase().includes(value.toLowerCase())) {
        return app;
      }
    });
    console.log(search_res);
  };

  return (
    <>
    {/* <Layout page_title="Add Apps"> */}
      {/* Breadcrumb */}
      <div className="relative m-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search App"
            className="p-3"
            style={{ width: "100%" }}
            value={search}
            onChange={(e) => searchChange(e.target.value)}
          />
          {!search.length && (
            <BsSearch className="search-icon absolute top-2 right-2 p-1 text-2xl font-extrabold text-gray-400" />
          )}
        </div>
      </div>

      {/* Breadcrumb */}

      {/* content start  */}
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-4 m-3 md:grid-cols-4 lg:grid-cols-3">
          {apps.data.map((app) => {
            return <div
              key={app.id}
              className={
                selected_app === app.id
                  ? "border-2 border-blue-500 flex flex-col items-center justify-center p-3 bg-white rounded-md"
                  : "border-2  border-white flex flex-col items-center justify-center p-3 bg-white rounded-md"
              }
              onClick={() => handleNext(app?._id)}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-50 rounded">
                <img src={`http://localhost:8000/public/${app?.image}`} alt={app.name} className="w-10 h-10" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-center">
                {app.name}
              </h3>
            </div>
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <p className="p-2 text-gray-400">
              No app found! Please add your app.
            </p>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="btn-primary"
            >
              Go back to home
            </button>
          </div>
        </div>
      )}
      {/* content end  */}
    {/* </Layout> */}
    </>
  );
}
