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

const ViewAllOrders = () => {

	const user=Cookies.get('user');
	const [orderData,setOrderData]=useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);


    const toggleProductsVisibility = (index) => {
        setVisibleProducts((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

	useEffect(() => {
		getAllPendingOrders();
	}, []);

	const getAllPendingOrders = async () =>{
		const response = await almariService.allPendingOrders();

		if(response['status']==='SUCCESS')
		{
			setOrderData(response['data'])
		}
		else
		{
			setOrderData([]);
		}
	}

	const approveOrder = async (ORDER_ID,ORDER_STATUS) =>{
        try{
            const payload={
                ORDER_ID:ORDER_ID,
                ORDER_STATUS:ORDER_STATUS
            }

            const response=await almariService.updateOrder(payload);

            if(response.status==='SUCCESS')
            {
                toast.success("Order Updated")
                await getAllPendingOrders();
                return;
            }
            else
            {
                toast.error("Order Not Approved.");
                return;
            }

        }
        catch(error)
        {
            console.log(error)
        }
	}

	return (
		<Layout>
		<div className="container mt-4 mb-4">
		<h2 className="text-center mb-4">All Pending Orders</h2>
		{orderData.map((data, index) => (
               
			<div key={index} className="card mb-4 shadow-sm">
			<div className="card-header bg-primary text-white">
				<h5 className="card-title mb-0 text-white">Order Summary</h5>
			</div>
			<div className="card-body">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="mb-0"><strong>UserID:</strong></p>
				<span className="badge bg-secondary">{data.USERID}</span>
				</div>
				<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="mb-0"><strong>Order Date and Time:</strong></p>
				<p className="mb-0">{new Date(data.DATETIME).toLocaleString()}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="mb-0"><strong>Order Price:</strong></p>
				<p className="mb-0">PKR {data.ORDER_PRICE}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="mb-0"><strong>Payment Type:</strong></p>
				<span className="badge bg-secondary">{data.PAYMENT_TYPE.replace(/_/g, ' ')}</span>
				</div>
				<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="mb-0"><strong>Address:</strong></p>
				<p className="mb-0">{data.ADDRESS}</p>
				</div>
               
                <div className="d-flex justify-content-between align-items-center mr-5">
                <h5 className="mt-4">Products Ordered</h5>
                <div className="text-center mt-4">
                    <i
                        className={`fas ${visibleProducts[index] ? 'fa-eye-slash' : 'fa-eye'} fa-cursor-pointer text-primary`}
                        onClick={() => toggleProductsVisibility(index)}
                        style={{ cursor: 'pointer' }}
                        aria-hidden="true"
                    ></i>
                    </div>
				</div>
				
                {visibleProducts[index] && (
                    <>
                        <ul className="list-group mt-3">
                            {data.orderDetails.map((product, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">{product.ITEM_TITLE}</h6>
                                        <small className="text-muted">Price: PKR {product.ITEM_PRICE}</small>
                                    </div>
                                    <span className="badge bg-info text-dark">Qty: {product.quantity || 1}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                 )}
			</div>
			<div className="card-footer text-muted">
				<div className="d-flex justify-content-between align-items-center">
				<span><strong>Status:</strong> {data.ORDER_STATUS.replace(/_/g, ' ')}</span>
				<span><strong>Payment:</strong> {data.PAYMENT_STATUS.replace(/_/g, ' ')}</span>
				</div>
			</div>
            {
				data.ORDER_STATUS === 'PENDING_FOR_APPROVAL' && (
					<div className="card-footer text-muted">
						<div className="d-flex justify-content-center align-items-center">
						<button type="button" className="btn btn-success ml-2 mb-2 mr-3 " onClick={() => approveOrder(data.ID,'DISPATCHED_FROM_STORE' )}>
							<a href="#" style={{ color: "white" , fontSize: 16}}>
							DISPATCHED FROM STORE
							</a>
						</button>
						</div>
					</div>
				)
			}

            {
				data.ORDER_STATUS === 'DISPATCHED_FROM_STORE' && (
					<div className="card-footer text-muted">
						<div className="d-flex justify-content-center align-items-center">
						<button type="button" className="btn btn-success ml-2 mb-2 mr-3 " onClick={() => approveOrder(data.ID,'ARRIVED_AT_YOUR_CITY' )}>
							<a href="#" style={{ color: "white" , fontSize: 16}}>
							VERIFY ARRIVAL AT CUSTOMER CITY
							</a>
						</button>
						</div>
					</div>
				)
			}
             {
				data.ORDER_STATUS === 'ARRIVED_AT_YOUR_CITY' && (
					<div className="card-footer text-muted">
						<div className="d-flex justify-content-center align-items-center">
						<button type="button" className="btn btn-success ml-2 mb-2 mr-3 " onClick={() => approveOrder(data.ID,'RECEIVED' )}>
							<a href="#" style={{ color: "white" , fontSize: 16}}>
							RECEIVED BY CUSTOMER
							</a>
						</button>
						</div>
					</div>
				)
			}
			</div>
		))}
		</div>

		</Layout>
	);
};

export default ViewAllOrders;