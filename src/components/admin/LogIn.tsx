import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../../api/apiAuth";
import { authenticate, isAuthenticated } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    setError("");

    auth({ email, password })
      .then((res) =>
        authenticate(res.data.token, () => {
          setLoading(false);
          setError("");
          navigate("/admin");
        })
      )
      .catch((err) => {
        setLoading(false);
        // pass to setError err.response.data.error
        console.log(err.response);
        setError(err.response.data);
        console.log(err.response.data);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
  };

  useEffect(() => {
    const authstatus = isAuthenticated();
    if (authstatus) {
      navigate("/admin");
    }
  }, []);
  return (
    <section className="w-screen h-screen bg-gray-50">
      <div className="px-4 py-20 mx-auto max-w-7xl">
        <Link
          to="/"
          title="Golden Bourgh Aquaculture Ltd HomePage"
          className="flex items-center justify-start sm:justify-center"
        >
          <img
            src={require("../../assets/img/gbicon.PNG")}
            alt="Golden Bourgh Aquaculture Logo"
          />
        </Link>

        <div className="w-full px-0 pt-5 pb-6 mx-auto mt-4 mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-lg md:bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 sm:mt-8 sm:mb-5">
          <h1 className="mb-5 text-xl font-light text-left text-gray-800 sm:text-center">
            Log in to your account
          </h1>
          {error ? (
            <div
              className="text-red-700 bg-red-100 border-r-4 rounded-none alert"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          <form className="pb-1 space-y-4">
            <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-700">
                Your Email
              </span>
              <input
                className="form-input"
                type="email"
                placeholder="Ex. james@bond.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="block mb-1 text-xs font-medium text-gray-700">
                Your Password
              </span>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">
                  Remember me
                </span>
              </label>
              {!loading ? (
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  Log In
                </button>
              ) : (
                <button className="btn btn-outline-dark btn-loading">
                  <span
                    className="w-4 h-4 spinner"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="pl-1">Loading...</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* <p className="mb-4 space-y-2 text-sm text-left text-gray-600 sm:text-center sm:space-y-0">
          <a href="#" className="w-full btn btn-sm btn-link sm:w-auto">
            Forgot password
          </a>
          <a href="#" className="w-full btn btn-sm btn-link sm:w-auto">
            Create an account
          </a>
        </p> */}
      </div>
    </section>
  );
};

export default Login;
