import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";

const HeaderTop = () => {
  return (
    <div className="border-bottom border-gray-200 d-none d-sm-block">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-none d-lg-flex gap-1">
            <div className="bg-light rounded p-2 text-primary cursor-pointer hover-bg-primary hover-text-white">
              <a
                href="https://www.facebook.com/hafsa.bloch111113?mibextid=hIlR13"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook />
              </a>
            </div>

            <div className="bg-light rounded p-2 text-primary cursor-pointer hover-bg-primary hover-text-white">
              <a
                href="https://www.instagram.com/umm_e_hafsa___?igshid=YzVkODRmOTdmMw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </a>
            </div>
          </div>

          <div className="d-flex gap-4 align-items-center">
          <button type="button" className="btn btn-danger">
            <a href="/Login" style={{ color: "white" }}>
              Logout
            </a>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
