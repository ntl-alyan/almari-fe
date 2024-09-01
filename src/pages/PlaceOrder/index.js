import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { almariService } from '../../../services/customer';
import CardComponent from '../../../page-components/CardComponent';
import AddToCartComponent from '../../../page-components/AddToCartComponent';
import Router  from 'next/router';
import { useCartData } from '../../../helpers/react-query';
import Layout from '../../../page-components/layout';
import { toast } from 'react-toastify';

const initialUser={
  ID:"",
  EMAIL:"",
  AGE:"",
  FIRSTNAME:"",
  LASTNAME:"",
  GENDER:"",
  CITY:""
}

const PlaceOrder = () => {

	const user=Cookies.get('user');
	const [cartItems,setCartItems]=useState([]);
	const { data: activeCartData } = useCartData(user);
    const [products, setProducts] = useState([]);
    const [userData,setUserData]=useState(initialUser);
    const [totalAmount, setTotalAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const orderDetails=[];

    if(!address || address==='')
    {
        toast.error('Please Enter Address.')
    }

    products.map((element)=>{
        let data={
            ITEM_TITLE:element.TITLE,
            ITEM_PRICE:element.PRICE,
            IMAGE:element.IMAGE,
            ITEMLINK:element.ITEMLINK ? element.ITEMLINK : null,
            DESCRIPTION:element.DESCRIPTION ? element.DESCRIPTION : null 
        }
       
        orderDetails.push(data);

    })

    const payload={
        USERID:user,
        ADDRESS:address,
        ORDER_PRICE:totalAmount.toString(),
        PAYMENT_TYPE:paymentMethod,
        orderDetails:orderDetails
    }


    const response=await almariService.createOrder(payload);

    if(response['status']==="SUCCESS")
    {
        toast.success(response['message']);
        Router.push("/Home")
    }

  }

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

  useEffect(() => {
    if(activeCartData)
    {
      calculateTotalAmount(activeCartData.data);
    }

    getUserDetails()
		
	}, [activeCartData]);

    useEffect(() => {
        if(activeCartData)
        {
          setProducts(activeCartData.data);
        }
            
        }, [activeCartData]);

  const calculateTotalAmount = async (data) => {
    let amount = 0;
    if(data.length>0)
    {
      
      for (let i = 0; i < data.length; i++) {
        const priceWithoutCommas = data[i]['PRICE'].replace(/,/g, '');
        amount+=parseFloat(priceWithoutCommas)
    
      }
    }
    setTotalAmount(amount);
  }


	return (
        <Layout>
          <div className="container my-3">
            <h2 className='text-center'> Order Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <h4 htmlFor="email" className="form-label">Email</h4>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={user}
                //   onChange={(e) => setPhone(e.target.value)}
                  disabled
                />
              </div>

              <div className="mb-3">
                <h4 htmlFor="city" className="form-label">City</h4>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={userData.CITY}
                //   onChange={(e) => setPhone(e.target.value)}
                  disabled
                />
              </div>
    
              <div className="mb-3">
                <h4 htmlFor="address" className="form-label">Address</h4>
                <textarea
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>
    
              <div className="mb-3">
                <h4 htmlFor="paymentMethod" className="form-label">Payment Method</h4>
                <select
                  className="form-select"
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="DEBIT_CARD">Debit Card</option>
                  <option value="PAYPAL">PayPal</option>
                  <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                </select>
              </div>

              {(paymentMethod==='DEBIT_CARD' ||  paymentMethod==='CREDIT_CARD' ||  paymentMethod==='PAYPAL') &&
                <>
                 <div className="mb-3">
                <h4 htmlFor="card" className="form-label">Please Enter Debit Card Number</h4>
                <input
                  className="form-control"
                  id="card"
                  type='number'
                  // value={address}
                  // onChange={(e) => setAddress(e.target.value)}
                  // required
                ></input>
              </div>
                </>
              }

              <div className="mb-3">
                    <h4>Order Details</h4>
                    <ul className="list-group">
                    {products.map((product, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {product.TITLE} (x{1})
                        <span>PKR. {product.PRICE}</span>
                        </li>
                    ))}
                    </ul>
                </div>
    
              <div className="mb-3">
                <h4 htmlFor="phone" className="form-label">Total Amount</h4>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={totalAmount}
                //   onChange={(e) => setPhone(e.target.value)}
                  disabled
                />
              </div>
    
              <button type="submit" className="btn btn-primary">Place Order</button>
            </form>
          </div>
        </Layout>
      );
};

export default PlaceOrder;