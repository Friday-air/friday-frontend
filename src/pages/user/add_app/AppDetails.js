import React, { useEffect } from "react";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useGetAppQuery } from "../../../store/app-api-slice";

export default function AppDetails() {
  const { app_id } = useParams();
  const navigate = useNavigate();
  const { data: app_details, isLoading } = useGetAppQuery(app_id);
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const realmId = queryParameters.get("realmId");
    const code = queryParameters.get("code");
    if (realmId && code) {
    } else {
      if (!isLoading) {
        if (app_details) {
          if (app_details?.data?.url) {
            window.location.href = app_details?.data?.url;
          }
        } else {
          navigate(-1);
        }
      }
    }
  }, [app_details, navigate, isLoading]);

  return (
    <Layout page_title="App Details">
      <div className="flex  justify-center h-[50vh]">
        <div className="text-center">
          {isLoading ? (
            <div className="text-center p-2">
              <img
                src={require("../../../assets/img/logo.png")}
                className="h-10 text-center m-auto my-5"
              />
              <h1 className="text-3xl font-extrabold">Loading..</h1>
              <p className="p-2 text-gray-400 text-md">
                You app is connecting. Please be patient...
              </p>
            </div>
          ) : app_details?.data?.app_slug === "quickbooks" ? (
            <div>
              <img
                src="http://designsystem.quickbooks.com/wp-content/uploads/2022/09/qb-logo-horizontal-preferred.svg"
                className="h-20 text-center p-2 m-auto"
              />
              <p>
                <strong>Company Name: </strong>{" "}
                {app_details.data.app_details.CompanyName}
              </p>
              <p>
                <strong>City: </strong>{" "}
                {app_details.data.app_details.CompanyAddr.City}
              </p>
              <p>
                <strong>Street: </strong>{" "}
                {app_details.data.app_details.CompanyAddr.Line1}
              </p>
              <p>
                <strong>Postal Code: </strong>{" "}
                {app_details.data.app_details.CompanyAddr.PostalCode}
              </p>
            </div>
          ) : (
            <div className="text-center p-2">
              <img
                src={require("../../../assets/img/logo.png")}
                className="h-10 text-center m-auto my-5"
              />
              <h1 className="text-3xl font-extrabold">Loading..</h1>
              <p className="p-2 text-gray-400 text-md">
                You app is connecting. Please be patient...
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
