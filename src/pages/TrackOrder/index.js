import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { almariService } from '../../../services/customer';
import { FaCheckCircle, FaDotCircle } from 'react-icons/fa';
import Layout from '../../../page-components/layout';
import { useRouter } from 'next/router';

const TrackOrder = () => {
	const router = useRouter();
	const { ORDER_ID } = router.query; 

	const user=Cookies.get('user');
	const [currentStage,setCurrentStage]=useState('');
	const [orderData,setOrderData]=useState([]);

	useEffect(() => {
		if(ORDER_ID)
		{
			findOrderbyID();
		}
	
	  }, [ORDER_ID])
	

	const findOrderbyID = async () => {
		const response=await almariService.findOrderByID(parseInt(ORDER_ID));
		
		if(response.status==='SUCCESS')
		{
			setOrderData(response['data']);
			setCurrentStage(response.data[0]['ORDER_STATUS'])
		}

	}

	const stages = [
		"PENDING_FOR_APPROVAL",
		"DISPATCHED_FROM_STORE",
		"ARRIVED_AT_YOUR_CITY",
		"RECEIVED",
	  ];
	
	  // Determine the progress percentage based on the current stage
	  const progressPercentage = ((stages.indexOf(currentStage) + 1) / stages.length) * 100;

	return (
		<Layout>
			<div className="container mt-4">
				<h2 className="text-center mb-4">Order Progress</h2>
				<div className="progress" style={{ height: '30px', borderRadius: '50px', overflow: 'hidden' }}>
					<div
					className="progress-bar progress-bar-striped progress-bar-animated bg-info"
					role="progressbar"
					style={{ width: `${progressPercentage}%` }}
					aria-valuenow={progressPercentage}
					aria-valuemin="0"
					aria-valuemax="100"
					>
					<span className="d-flex align-items-center justify-content-center w-100">
						{stages.indexOf(currentStage) === stages.length - 1 ? (
						<FaCheckCircle className="me-2" />
						) : (
						<FaDotCircle className="me-2" />
						)}
						{currentStage.replace(/_/g, ' ')}
					</span>
					</div>
				</div>
				<ul className="list-group mt-3">
					{stages.map((stage, index) => (
					<li
						key={index}
						className={`list-group-item d-flex justify-content-between align-items-center ${
						index <= stages.indexOf(currentStage) ? 'bg-light' : ''
						}`}
						style={{ transition: 'background-color 0.3s ease-in-out' }}
					>
						<div className="d-flex align-items-center">
						{index < stages.indexOf(currentStage) ? (
							<FaCheckCircle className="text-success me-2" />
						) : index === stages.indexOf(currentStage) ? (
							<FaDotCircle className="text-info me-2" />
						) : (
							<FaDotCircle className="text-muted me-2" />
						)}
						{stage.replace(/_/g, ' ')}
						</div>
						{index <= stages.indexOf(currentStage) && (
						<span className="badge bg-success text-uppercase">Completed</span>
						)}
					</li>
					))}
				</ul>

				<div className="container mt-4 mb-4">
		<h2 className="text-center mb-4">Order Details</h2>
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
			</div>
		))}
				</div>

			</div>

		</Layout>
	);
};

export default TrackOrder;