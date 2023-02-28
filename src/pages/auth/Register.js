import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials, selectCurrentToken } from "../../store/auth-slice";
import { useRegisterMutation } from "../../store/auth-api-slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [user] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [error, setError] = React.useState([]);
  const token = useSelector(selectCurrentToken);

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/user/dashboard");
  }, [token, navigate]);

  //handle submit
  const handleSubmit = async () => {
    //displatch login
    try {
      if(password !== confirm_password) {
          toast.error("Password & confirm password do not match.")
      } else {
        const userData = await register({
          name,
          email,
          password,
          confirm_password,
          agree,
        }).unwrap();
        dispatch(setCredentials({ ...userData, user }));
        setEmail("");
        setPassword("");
  
        window.location.reload();
        toast.success("Registration Success.");
      }
    } catch (error) {
      if (error.data.message) {
        toast.error(error.data.message);
      } else {
        setError(error.data.message);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center min-h-screen p-4  bg-gray-100 justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md max md:flex-row md:flex-1 lg:max-w-screen-md w-full">
          <div className="py-10 px-5 bg-white md:flex-1">
            <img
              className="text-center m-auto"
              src={require("../../assets/img/logo.png")}
              style={{ height: 50 }}
              alt="logo"
            />
            <p className="my-4 text-sm  text-gray-500 text-center">
              Create a new account.
            </p>
            <form action="#" className="flex flex-col space-y-5">
              <div className="space-y-1">
                <label htmlFor="name">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="name"
                  id="name"
                  placeholder="MR XYZ"
                  className={`form-control ${
                    error.name
                      ? "border border-red-400"
                      : "border border-gray-300"
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="text-red-400 text-sm">{error.name}</span>
              </div>
              <div className="space-y-1">
                <label htmlFor="email">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className={`form-control ${
                    error.email
                      ? "border border-red-400"
                      : "border border-gray-300"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-red-400 text-sm">{error.email}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Password <span className="text-red-400">*</span>
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className={`form-control ${
                    error.password
                      ? "border border-red-400"
                      : "border border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-red-400 text-sm">{error.password}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm_password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`form-control ${
                    error.confirm_password
                      ? "border border-red-400"
                      : "border border-gray-300"
                  }`}
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="text-red-400 text-sm">
                  {error.confirm_password}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agree"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label
                  htmlFor="agree"
                  className="text-sm font-normal text-gray-500"
                >
                  I agree to the{" "}
                  <span
                    className="font-semibold"
                    onClick={() => navigate("terms")}
                  >
                    {" "}
                    terms & conditions.
                  </span>
                </label>
              </div>
              <span className="text-red-400 text-sm">{error.agree}</span>
              <div>
                {isLoading ? (
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-lg font-semibold text-white duration-300  btn-primary flex justify-center"
                    onClick={() => handleSubmit()}
                    disabled
                  >
                    <div className="w-6 h-6 rounded-full animate-spin  border border-solid border-white border-t-transparent"></div>
                    <span className="ml-2">Sending..</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300  btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Log in
                  </button>
                )}
              </div>
              <strong
                onClick={() => navigate("/login")}
                className="text-center text-sm"
              >
                Already have an account ?
              </strong>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
