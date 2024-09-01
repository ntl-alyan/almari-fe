import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { almariService } from "../services/customer";
import Router from "next/router";
import Cookies from "js-cookie";

const Signup = () => {
  const initialState = {
    FIRST_NAME: "",
    LAST_NAME: "",
    DOB: null,
    AGE: "",
    CITY: "",
    GENDER: "",
    EMAIL: "",
    PASSWORD: "",
    PRIORITY: "N",
  };

  const [fields, setFields] = useState(initialState);

  const citiesOfPakistan = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Peshawar",
    "Quetta",
    "Multan",
    "Gujranwala",
    "Sialkot",
    // Add more cities as needed
  ];

  useEffect(() => {
    const username = Cookies.get("user");
    if (username) {
      Cookies.remove("user");
      Cookies.remove("priority");
    }
  }, []);

  const moveToLogin= () =>{
    Router.push("/Login");
  }
  const handleLogin = () => {
    Cookies.set("user", fields.EMAIL, { expires: 7 });
    Cookies.set("priority", fields.PRIORITY, { expires: 7 });
    Router.push("/VerifyOTP");
  };

  const signupUser = async (e) => {
    e.preventDefault();
    if (Object.values(fields).some((value) => value === "")) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await almariService.signupCustomer(fields);
      if (response.status === "SUCCESS") {
        toast.success("Signup Successful");
        handleLogin();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityChange = (e) => {
    setFields((prev) => ({
      ...prev,
      CITY: e.target.value,
    }));
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFields((prev) => ({
      ...prev,
      GENDER: gender,
    }));
  };

  const handleDateChange = (date) => {
    const age = calculateAge(date);
    setFields((prev) => ({
      ...prev,
      DOB: date,
      AGE: age,
    }));
  };

  const calculateAge = (dob) => {
    const today = new Date();
    
    // Check if the selected date is in the future
    if (dob > today) {
      return null; // You can handle this error case as needed
    }
  
    const diffMs = today - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-12 col-lg-10">
          <div className="card shadow-lg" style={{ borderRadius: "1rem" }}>
            <div className="row no-gutters">
              <div className="col-md-6 d-flex align-items-center justify-content-center text-white shadow-sm" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/SignupImage.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}>
                <div className="p-4 text-center ">
                  <h2 className="display-4 mb-4 text-white" style={{ fontSize: '2.2rem', lineHeight: '1.2' }}>Welcome To Almari</h2>
                  <p className="lead text-white" style={{ fontSize: '1.1rem' }}>Create your new account.</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-body p-4 p-md-5">
                  <h5 className="card-title text-center mb-4">Signup Form</h5>
                  <form onSubmit={signupUser}>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="FIRST_NAME"
                          value={fields.FIRST_NAME}
                          onChange={handleInput}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="LAST_NAME"
                          value={fields.LAST_NAME}
                          onChange={handleInput}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="dob">Date of Birth</label>
                        <DatePicker
                          selected={fields.DOB}
                          onChange={handleDateChange}
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Select your date of birth"
                          showYearDropdown
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown
                        />
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="city">City</label>
                        <select
                          className="form-control"
                          id="city"
                          name="CITY"
                          value={fields.CITY}
                          onChange={handleCityChange}
                        >
                          <option value="">Select your city</option>
                          {citiesOfPakistan.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="EMAIL"
                          value={fields.EMAIL}
                          onChange={handleInput}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="form-group col-md-6 mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="PASSWORD"
                          value={fields.PASSWORD}
                          onChange={handleInput}
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <label>Gender</label>
                      <div className="d-flex mt-1">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GENDER"
                            id="male"
                            value="male"
                            checked={fields.GENDER === "male"}
                            onChange={handleGenderChange}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="GENDER"
                            id="female"
                            value="female"
                            checked={fields.GENDER === "female"}
                            onChange={handleGenderChange}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{
                          backgroundColor: "#ff6219",
                          borderColor: "#ff6219",
                          padding: "0.75rem 1.5rem",
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <p className="text-center mt-3">
									Already have an account?{" "}
									<a href="#" onClick={moveToLogin}>
										Login here
									</a>
									</p>
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
        .form-control:focus {
          border-color: #ff6219;
          box-shadow: none;
        }
        .card {
          background-color: #f8f9fa;
          border: none;
        }
        .custom-datepicker .react-datepicker__header {
          background-color: #ff6219;
        }
        .custom-datepicker .react-datepicker__day--selected {
          background-color: #ff6219;
        }
      `}</style>
    </div>
  );
};

export default Signup;
