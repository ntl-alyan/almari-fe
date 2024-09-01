import React, { useState } from 'react';
import Image from 'next/image';
import PrimaryModal from './productDetailModal';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { almariService } from '../services/customer';
import { useQueryClient } from "react-query";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";

export default function CardComponent({ data }) {
  const queryClient = useQueryClient();
  
  const initialState = {
    TITLE: "",
    IMAGE: "",
    PRICE: "",
    DESCRIPTION: "",
    TYPE:""
  };
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(initialState);

  const viewProductDetails = (title, description, price, image, type) => {
    setProductDetailModal(true);
    setProductDetails({
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

  const handlePredict = async () => {
    const payload = { image_url: productDetails.IMAGE };
    const response = await almariService.predictModel(payload);
    if (response) {
      console.log(response);
    }
  };

  const handleAddToCart = async () => {
    const username = Cookies.get('user');
    const payload = {
      TITLE: productDetails?.TITLE,
      PRICE: productDetails?.PRICE,
      IMAGE: productDetails?.IMAGE,
      ITEMLINK: productDetails?.ITEMLINK,
      DESCRIPTION: productDetails?.DESCRIPTION,
      SKUCODE: productDetails?.SKUCODE,
      USERNAME: username,
      TYPE:productDetails?.TYPE
    };

    const response = await almariService.addToCart(payload);
    if (response) {
      if (response.status === "SUCCESS") {
        toast.success("Added to cart");
        queryClient.invalidateQueries(['cart-data'])
        setProductDetailModal(false);
        return;
      } else {
        toast.error("Something went wrong");
        return;
      }
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          {data.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="card-img-top p-3 rounded-3" 
                  style={{ objectFit: 'contain', height: '300px' }} 
                  width={200} 
                  height={200} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center mb-3">PKR {item.price}</h5>
                  <button
                    type="button"
                    className="btn btn-success mt-auto"
                    onClick={() => viewProductDetails(item.title, item.description, item.price, item.image, item.type)}
                  >
                    View Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <PrimaryModal isOpenProp={productDetailModal}>
        <div className="container">
          <div className="row justify-content-center py-5">
            <div className="col-lg-8 col-md-10 border rounded p-4 bg-light">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Image 
                    src={productDetails.IMAGE} 
                    alt="Product Image" 
                    className="img-fluid rounded" 
                    style={{ objectFit: 'contain', maxHeight: '300px' }} 
                    width={500} 
                    height={500} 
                  />
                </div>
                <div className="col-md-6">
                  <h4 className="mb-3">{productDetails.TITLE}</h4>
                  <p className="text-muted">{productDetails.DESCRIPTION}</p>
                  <h5 className="text-primary mb-4">PKR. {productDetails.PRICE}</h5>
                  <div className="d-flex flex-column gap-2">
                    <button onClick={handleAddToCart} className="btn btn-success btn-sm">
                      <i className=""></i>
                      <HiOutlineShoppingCart className='h5 mx-1'/>Add to Cart
                    </button>
                    <button onClick={handleCloseModal} className="btn btn-secondary btn-sm">
                      Close
                    </button>
                    {/* <button onClick={handlePredict} className="btn btn-warning btn-sm">
                      Check
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrimaryModal>
    </>
  );
  
}
