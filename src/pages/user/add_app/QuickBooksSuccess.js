import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useConnectQuickbooksSuccessMutation } from "../../../store/app-api-slice";

export default function QuickBooksSuccess() {
  const dataFetchedRef = useRef(false);
  const [connectQuickbooksSuccess, { isLoading: isQuickbooksLoading }] =
    useConnectQuickbooksSuccessMutation();
  const navigate = useNavigate();
  const fetchQuickbooksSuccess = async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const realmId = queryParameters.get("realmId");
    const code = queryParameters.get("code");
    if (realmId && code) {
      const response = await connectQuickbooksSuccess({
        realmId,
        code,
      });
      if (response.data?.success) {
        toast.success(response.data.message);
        navigate("/user/apps");
      } else {
        toast.error("Something went wrong");
        navigate("/user/apps");
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchQuickbooksSuccess();
  }, []);

  return (
    <div className="text-center p-2">
      <img
        src={require("../../../assets/img/logo.png")}
        className="h-10 text-center m-auto my-5"
      />
      <h1 className="text-3xl font-extrabold">Redirecting..</h1>
      <p className="p-2 text-gray-400 text-md">
        You app is connecting. You will redirect soon. Please don't refresh the
        page and be patient...
      </p>
    </div>
  );
}
