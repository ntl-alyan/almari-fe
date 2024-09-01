"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { almariService } from "../../../services/customer";
import { ToastContainer, toast } from "react-toastify";
import Login from "../../../page-components/Login";

const LoginPage = () => {
  return (
    // <Layout>
    // 		<section className="vh-100" style={{ backgroundColor: '#FFFFFF' }}>
   
    <>
      <Login />
    </>

    // </section>
    // </Layout>
  );
};

export default LoginPage;
