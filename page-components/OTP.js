import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { almariService } from "../services/customer";
import Cookies from "js-cookie";
import Router  from "next/router";

const OTP = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const user = Cookies.get('user');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const verifyOtp = async () => {
        setError('');
        const payload={
            USERID:user,
            VALUE: otp,
        }

        const verify=await almariService.verifyOTP(payload);

        if(verify.status==='SUCCESS')
        {
            setIsVerified(true);
            setError('');
            Router.push("/Home");
        }
        else {
            setError('Invalid OTP. Please try again.');
            setIsVerified(false);
        }
    };

    const resendOTP = async () => {

        const payload={
            USERID:user,
            KEY: 'EMAIL',
        }

        const generateOTP=await almariService.generateOTP(payload);

        if(generateOTP.status==='SUCCESS')
        {
            toast.success('OTP Generated');
            setOtp('')
            return
        }
        else {
            toast.error('Failed to generate OTP. Try Again');
            return
        }
    };
  return (
    <>
   <div className="container py-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="container mb-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h2 className="text-center mb-4 mt-2">Verify OTP</h2>
                    <div >
                        <div >
                            {isVerified ? (
                                <div className="alert alert-success" role="alert">
                                    OTP verified successfully!
                                </div>
                            ) : (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">We’ve sent a One-Time Password (OTP) to your email address.</label>
                                        <label htmlFor="otpInput" className="form-label">Please enter the OTP below to continue:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="otpInput"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            placeholder="Enter 6-digit OTP"
                                        />
                                    </div>
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        onClick={verifyOtp}
                                    >
                                        Verify OTP
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-warning w-100 mt-2"
                                        onClick={resendOTP}
                                    >
                                        Resend OTP
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  );
};

export default OTP;
