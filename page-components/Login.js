import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { almariService } from "../services/customer";
import Cookies from "js-cookie";
import Router  from "next/router";

const Login = () => {
  const initialState = {
    EMAIL: "",
    PASSWORD: "",
  };
  const [loginState, setLoginState] = useState(initialState);

  useEffect(() => {
    const username = Cookies.get("user");
    if (username) {
      Cookies.remove("user");
      Cookies.remove("priority");
    }
  }, []);

  const handleRegistration = () => {
    Router.push("/Signup");
  };

  const handleLogin = () => {
    Router.push("/Home");
  };

  const handleInputChange = (event) => {
    setLoginState({
      ...loginState,
      [event.target.name]: event.target.value,
    });
  };

  const checkLogin = async () => {
    if (loginState.EMAIL === "" || loginState.PASSWORD === "") {
      toast.error("Please Fill All The Fields");
      return;
    }

    const payload = {
      EMAIL: loginState.EMAIL,
      PASSWORD: loginState.PASSWORD,
    };

    const response = await almariService.loginCustomer(payload);
    if (response) {
      if (response.status === "SUCCESS") {
        toast.success("Login Successfull");
        Cookies.set("user", loginState.EMAIL, { expires: 1/24 });
        Cookies.set("priority", response.data[0]['PRIORITY'], { expires: 1/24 });
        handleLogin();
      } else {
        toast.error("Invalid Credentials");
      }
    } else {
      toast.error("Login Failed");
    }
  };
  return (
    <>
   <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 d-none d-md-block text-center">
                <img
                  src="/LoginImage.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="card-body p-4 p-md-5 ">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1 ">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: "#ff6219" }}
                      ></i>
                      <span className="h2 fw-bold mb-0">Login</span>
                    </div>
                    <h5
                      className="card-title text-center mb-4"
                      style={{ letterSpacing: "1px" }}
                    >
                      Log into your account
                    </h5>
                    <div className="mb-4">
                      <input
                        type="email"
                        id="userid"
                        onChange={handleInputChange}
                        name="EMAIL"
                        value={loginState.EMAIL}
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        id="password"
                        onChange={handleInputChange}
                        value={loginState.PASSWORD}
                        name="PASSWORD"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={checkLogin}
                        style={{
                          backgroundColor: "#ff6219",
                          borderColor: "#ff6219",
                        }}
                      >
                        Login
                      </button>
                    </div>
                    {/* <a className="small text-muted d-block text-center mb-2" href="#!">
                      Forgot password?
                    </a> */}
                    <p className="text-center mb-5" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <a
                        href="/Signup"
                        onClick={handleRegistration}
                        // style={{ color: "#393f81" }}
                      >
                        Register here
                      </a>
                    </p>
                    <div className="d-flex justify-content-center">
                      <a href="#!" className="small text-muted me-3">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .btn-primary:hover {
          background-color: #e65c50;
          border-color: #e65c50;
        }
      `}</style>
    </div>
    </>
  );
};

export default Login;
