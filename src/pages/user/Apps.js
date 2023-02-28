import "../../App.css";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import { useGetConnectedAppsQuery,useGetAppsQuery } from "../../store/app-api-slice";

function Apps() {
  const navigate = useNavigate();
  const { data: connected_apps } = useGetConnectedAppsQuery();
  const { data: apps } = useGetAppsQuery();
  const handleNext = async (id) => {
    navigate(`/user/apps/new-list/${id}`)
  };

  return (
    <>
    {/* <Layout page_title="All Apps"> */}
      {/* Breadcrumb */}
      {/* <div className="flex justify-between m-3">
        <button type="button" className="btn-primary">
          All Apps
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="p-2"
            style={{ maxWidth: "200px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!search.length && (
            <BsSearch className="search-icon absolute top-2 right-2 p-1 text-2xl font-extrabold text-gray-400" />
          )}
        </div>
      </div> */}
      {/* Breadcrumb */}

      {/* content start */}
      {connected_apps?.data?.length ? (
        <div className="grid grid-cols-2 gap-4 m-3 md:grid-cols-4 lg:grid-cols-5 mt-5">
          {connected_apps.data.map((app) => {
            return  apps?.data?.map((item) => (
            item?._id === app?.appId &&  
            <div
              key={item._id}
              className="border-2  border-white flex flex-col items-center justify-center p-3 bg-white rounded-md"
              onClick={() => handleNext(app?.appId)}
            >
              <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-50 rounded">
                <img
                  src={`http://localhost:8000/public/${item?.image}`}
                  alt={item?.name}
                  className="w-10 h-10"
                />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-center">
                {item?.name}
              </h3>
            </div>
          ))
          })}
          <div className="border-2  border-white flex flex-col items-center justify-center p-3 bg-white rounded-md min-h-[180px]">
            <div className="text-center">
              <button
                onClick={() => navigate("/user/apps/new-list")}
                className="btn-primary"
              >
                Add More
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <p className="p-2 text-gray-400">
              No app found! Please add your app.
            </p>
            <button
              onClick={() => navigate("/user/apps/new-list")}
              className="btn-primary"
            >
              Add New App
            </button>
          </div>
        </div>
      )}

      {/* content  end*/}
    {/* </Layout> */}
    </>
  );
}

export default Apps;
