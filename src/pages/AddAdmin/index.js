import React, { useState } from "react";
import { toast } from "react-toastify";
import { almariService } from '../../../services/customer'
import Layout from "../../../page-components/layout";
import Router from "next/router";

const initialState = {
    FIRST_NAME: "",
    LAST_NAME: "",
    AGE: "",
    CITY: "",
    GENDER: "",
    EMAIL: "",
    PASSWORD: "",
    PRIORITY:'ADMIN'
  };

const AddAdmin = () => {

  const [fields, setFields] = useState(initialState);

  const handleLogin = () => {
    // Redirect to the login page
    Router.push("/Home");
  };

  const signupUser = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Check if any field is empty
    if (Object.values(fields).some((value) => value === "")) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await almariService.signupCustomer(fields);
      if (response.status === "SUCCESS") {
        toast.success("Admin Signup Successful");
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
      [name]: value
    }));
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFields((prev) => ({
      ...prev,
      GENDER: gender
    }));
  };

  return (
    <Layout>
    <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-4 p-md-5">
              <h5 className="card-title text-center mb-4">Add New Admin</h5>
              <form onSubmit={signupUser}>
                <div className="row mb-4">
                  <div className="form-group col-md-6">
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
                  <div className="form-group col-md-6">
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
                <div className="row mb-4">
                  <div className="form-group col-md-6">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="AGE"
                      value={fields.AGE}
                      onChange={handleInput}
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="CITY"
                      value={fields.CITY}
                      onChange={handleInput}
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="form-group col-md-6">
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
                  <div className="form-group col-md-6">
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
                <div className="form-group mb-4 mb">
                  <label className="mr-2 ">Gender:</label>
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
                    <label className="form-check-label" htmlFor="male">Male</label>
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
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#ff6219",
                      borderColor: "#ff6219",
                    }}
                  >
                    Register
                  </button>
                </div>
              </form>
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
    </Layout>
  );
};

export default AddAdmin;
