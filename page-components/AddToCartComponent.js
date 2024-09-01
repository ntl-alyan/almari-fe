
import React, {  useState,useEffect } from 'react';
import Image from 'next/image';
import PrimaryModal from './productDetailModal';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { almariService } from '../services/customer'
import Router from "next/router";
import { useQueryClient } from "react-query";
import Link from 'next/link';

const initialState = {
  ID:'',
  TITLE: '',
  IMAGE: '',
  PRICE: '',
  DESCRIPTION: '',
};

export default function AddToCartComponent({ data }) {
  
  const queryClient = useQueryClient();
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [showReceiptModal, setShowReceiptlModal] = useState(false);
  const [productDetails, setProductDetails] = useState(initialState);
  const [types, setTypes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const viewProductDetails = (id, title, description, price, image ,type) => {
    setProductDetailModal(true);
    setProductDetails({
      ID:id,
      TITLE: title,
      IMAGE: image,
      PRICE: price,
      DESCRIPTION: description,
      TYPE:type
    });
  };

  const handleCloseModal = () => {
    setProductDetailModal(false);
  };

  const handleCloseRecieptModal = () => {
    setShowReceiptlModal(false);
  };

  const removeFromCart = async () => {
  {
    try{
      const deleteRes=await almariService.deleteFromCart(+productDetails.ID);
      if(deleteRes)
      {
        if(deleteRes.status==="SUCCESS"){
          toast.success(deleteRes.message);
          queryClient.invalidateQueries(['cart-data'])
          handleCloseModal(false);
        }
        else{
          toast.error(deleteRes.message)
        }
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
  }

  const placeOrder = async () => {    
    Router.push("/PlaceOrder")
  };

  useEffect(() => {
    if(data.length>0)
    {
      calculateTotalAmount();
    }
		
	}, [data]);


  const calculateTotalAmount = async () => {
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

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setTypes((prevTypes) =>
        event.target.checked
            ? [...prevTypes, category]
            : prevTypes.filter((type) => type !== category)
    );
};

  const handleShowReceipt = () => {
    setShowReceiptlModal(true);
  };

  const handleMatching =  () =>{
    try{
      if(types.length===0)
        {
          return toast.error("Please Select A Type First");
        }
      Router.push(`/MatchingItems?image_url=${productDetails.IMAGE}&type=${types}`)
    }
    catch(error)
    {
      console.log(error)
    }
  }
  
  return (
    <>
      {data.length > 0 ? (
        <div>
          <div className="d-flex flex-wrap justify-content-center">
            {data.map((item, index) => (
              <div key={index} className="card m-3" style={{ width: '18rem' }}>
                <div className="card-img-top">
                <Image 
                  src={item.IMAGE} 
                  alt={item.TITLE} 
                  className="card-img-top p-3 rounded-3" 
                  style={{ objectFit: 'contain', height: '300px' }} 
                  width={200} 
                  height={200} 
                />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Price: PKR {item.PRICE}</h5>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => viewProductDetails(item.ID, item.TITLE, item.DESCRIPTION, item.PRICE, item.IMAGE, item.TYPE)}
                  >
                    View Item
                  </button>
                </div>
              </div>
            ))}
          </div>
  
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-info mb-2">
              <a href="#" className="text-white text-decoration-none" style={{ fontSize: '22px' }} onClick={handleShowReceipt}>
                Proceed To The Receipt
              </a>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-center my-5">
            <h4 className="text-danger">No Items In Cart Found</h4>
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-info">
              <Link href="/Home" className="text-white text-decoration-none">
                Back to Home Page
              </Link>
            </button>
          </div>
        </div>
      )}
  
      {/* Display total amount */}
      <PrimaryModal isOpenProp={productDetailModal}>
  <section className="container-fluid px-4">
    <div className="row justify-content-center py-5">
      <div className="col-lg-8 p-4 rounded shadow-sm bg-white">
        <div className="row">
        <div className="col-md-5 d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <Image src={productDetails.IMAGE} alt="productImage" width={300} height={300} className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3 fw-bold">{productDetails.TITLE}</h2>
            <p className="mb-4 text-muted">{productDetails.DESCRIPTION}</p>
            <h4 className="text-primary mb-4">PKR. {productDetails.PRICE}</h4>

            <div className="border rounded p-3 bg-light mb-4">
                  <p className="h5">Find Matching Items By:</p>
                  {productDetails.TYPE === 'Shoes' && (
                    <div className="row g-3">
                      {["Lawn", "Suit", "Trousers"].map((category) => (
                        <div className="col-sm-6 col-md-4" key={category}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="CATEGORY"
                              id={`${category.toLowerCase()}Radio`}
                              value={category}
                              onChange={handleCategoryChange}
                            />
                            <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                              {category}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    )}
                    {productDetails.TYPE === 'Lawn' && (
                      <div className="row g-3">
                        {["Shoes", "Trousers"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {productDetails.TYPE === 'Suit' && (
                      <div className="row g-3">
                        {["Shoes"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {productDetails.TYPE === 'Trousers' && (
                      <div className="row g-3">
                        {["Shoes","Lawn"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
            </div>

            <button onClick={handleMatching} className="btn btn-primary w-100 mb-3 py-2 fw-bold">
              Find Matching Items
            </button>

            <div className="d-flex justify-content-between">
              <button onClick={removeFromCart} className="btn btn-outline-danger me-2 flex-grow-1">
                Remove From Cart
              </button>
              <button onClick={handleCloseModal} className="btn btn-outline-dark flex-grow-1">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</PrimaryModal>


      {/* <PrimaryModal isOpenProp={productDetailModal}>
        <section className="container">
          <div className="row justify-content-center py-5">
            <div className="col-lg-8 border rounded p-4">
              <div className="row">
                <div className="col-md-5 text-center">
                  <Image src={productDetails.IMAGE} alt="productImage" width={300} 
                  height={300}  className="img-fluid" />
                </div>
                <div className="col-md-7">
                  <h2 className="mb-3">{productDetails.TITLE}</h2>
                  <p className="mb-4">{productDetails.DESCRIPTION}</p>
                  <h4 className="text-primary mb-4">PKR. {productDetails.PRICE}</h4>
                  
                  <div className="border rounded p-3 bg-light mb-4">
                    <p className="h5">Find Matching Items By:</p>
                    {productDetails.TYPE === 'Shoes' && (
                      <div className="row g-3">
                        {["Lawn", "Suit", "Trousers"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {productDetails.TYPE === 'Lawn' && (
                      <div className="row g-3">
                        {["Shoes", "Trousers"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {productDetails.TYPE === 'Suit' && (
                      <div className="row g-3">
                        {["Shoes"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {productDetails.TYPE === 'Trousers' && (
                      <div className="row g-3">
                        {["Shoes","Lawn"].map((category) => (
                          <div className="col-sm-6 col-md-4" key={category}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="CATEGORY"
                                id={`${category.toLowerCase()}Radio`}
                                value={category}
                                onChange={handleCategoryChange}
                              />
                              <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                {category}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button onClick={handleMatching} className="btn btn-primary mb-3">
                    Find Matching Items
                  </button>
                  <div className="d-flex">
                    <button onClick={removeFromCart} className="btn btn-danger me-2">
                      Remove From Cart
                    </button>
                    <button onClick={handleCloseModal} className="btn btn-outline-dark">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PrimaryModal> */}
  
      <PrimaryModal isOpenProp={showReceiptModal}>
        <div className="container py-5">
          <div className="bg-secondary text-white py-3 text-center mb-4">
            <h3 className="mb-0 text-white">Receipt</h3>
          </div>
          <div className="row">
            {data.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.TITLE}</h5>
                    <p className="card-text">Price: PKR {item.PRICE}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="row">
            <h5>Total Amount: PKR. {totalAmount}</h5>
          </div>
  
          <div className="d-flex justify-content-center mt-4">
            <button type="button" className="btn btn-outline-dark me-2" onClick={handleCloseRecieptModal}>
              Cancel
            </button>
            <button type="button" className="btn btn-success" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </PrimaryModal>
    </>
  );
  
}
