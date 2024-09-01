import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { almariService } from '../../../services/customer';
import CardComponent from '../../../page-components/CardComponent';
import AddToCartComponent from '../../../page-components/AddToCartComponent';
import Router  from 'next/router';
import { useCartData } from '../../../helpers/react-query';
import Layout from '../../../page-components/layout';

const TrackOrder = () => {

	const user=Cookies.get('user');
	const [orderData,setOrderData]=useState([]);
	

	useEffect(() => {
		getAllOrders();
	}, []);

	const getAllOrders = async () =>{
		const response = await almariService.getOrders(user);

		if(response['status']==='SUCCESS')
		{
			setOrderData(response['data'])
		}
		else
		{
			setOrderData([]);
		}
	}

	const trackOrders = async (ORDER_ID) =>{
		Router.push(`/TrackOrder?ORDER_ID=${ORDER_ID}`)
	}

	return (
		<Layout>
		<div className="container mt-4 mb-5">
		<h2 className="text-center mb-4">Order Details</h2>
			{orderData.length>0 &&
			<div>
				{orderData.map((data, index) => (
					<div key={index} className="card mb-4 shadow-sm">
					<div className="card-header bg-primary text-white">
						<h5 className="card-title mb-0 text-white">Order Summary</h5>
					</div>
					<div className="card-body">
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
						<h5 className="mt-4">Products Ordered</h5>
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
					</div>
					<div className="card-footer text-muted">
						<div className="d-flex justify-content-between align-items-center">
						<span><strong>Status:</strong> {data.ORDER_STATUS.replace(/_/g, ' ')}</span>
						<span><strong>Payment:</strong> {data.PAYMENT_STATUS.replace(/_/g, ' ')}</span>
						</div>
					</div>
					<div className="card-footer text-muted">
						<div className="d-flex justify-content-center align-items-center">
						<button type="button" className="btn btn-danger ml-2 mb-2 mr-3 " onClick={() => trackOrders(data.ID)}>
							<a href="#" style={{ color: "white" , fontSize: 16}}>
							Track Order
							</a>
						</button>
						</div>
					</div>
					</div>
					
				))}
				</div>
			}

			{orderData.length===0 &&
				<div className="row mt-4 h3 justify-content-center">No pending orders found. Please place an order first.</div>
			}
		</div>

		</Layout>
	);
};

export default TrackOrder;