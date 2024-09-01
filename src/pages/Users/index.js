import React,{useEffect,useState} from 'react'
import Layout from '../../../page-components/layout';
import Cookies from 'js-cookie';
import { almariService } from '../../../services/customer';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Router from 'next/router';

const initialUser={
    ID:"",
    EMAIL:"",
    AGE:"",
    FIRSTNAME:"",
    LASTNAME:"",
    GENDER:"",
    CITY:""
}

export default function User ()  {

    const [userData,setUserData]=useState(initialUser);

    useEffect(() => {
		getUserDetails();
	}, []);

    const getUserDetails =  async () => {
        
        const username=Cookies.get('user');
		if(!username)
		{
            Router.push("/Login");
		}
		const response=await almariService.getUserProfile(username);

        if (response.status === "SUCCESS") {
            const user = response.data[0];
            setUserData({
                ID: user.ID,
                FIRSTNAME: user.USERID.FIRSTNAME,
                LASTNAME: user.USERID.LASTNAME,
                GENDER: user.USERID.GENDER,
                EMAIL: user.EMAIL,
                CITY: user.USERID.CITY,
                AGE: user.USERID.AGE
            });
        }
        else{
            toast.error("User Data Not Found");
        }
    }

  return (
    <Layout>
    <div className='container mt-4'>
      <div className='d-flex justify-content-center'>
        <h3>User Profile</h3>
      </div>
        <div className="row mt-4 mb-5">
            <div className="col-md-6 offset-md-3">
            <div className="card shadow">
                <div className="card-body">
                <div className="d-flex justify-content-center text-center mb-4">
                    <Image src="/profile-pic.png" alt="Profile Picture" className="img-fluid rounded-circle"  width={100} height={100} />
                </div>
                <h6 className="card-title text-center mb-4">{userData.FIRSTNAME} {userData.LASTNAME}</h6>
                <div className="row">
                    <div className="col-md-6">
                    <p className="card-text"><strong>Customer ID:</strong> {userData.ID}</p>
                    <p className="card-text"><strong>First Name:</strong> {userData.FIRSTNAME}</p>
                    <p className="card-text"><strong>Last Name:</strong> {userData.LASTNAME}</p>
                    </div>
                    <div className="col-md-6">
                    <p className="card-text"><strong>Gender:</strong> {userData.GENDER}</p>
                    <p className="card-text"><strong>Age:</strong> {userData.AGE}</p>
                    <p className="card-text"><strong>City:</strong> {userData.CITY}</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-info mb-3 mr-3 flex-right">
            <a href="/Home" style={{ color: "white" }}>
              Back to Home Page
            </a>
          </button>
      </div>

        </div>
    </Layout>
    );
};