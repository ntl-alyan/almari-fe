import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { almariService } from '../../../services/customer';
import CardComponent from '../../../page-components/CardComponent';
import AddToCartComponent from '../../../page-components/AddToCartComponent';
import Router  from 'next/router';
import { useCartData } from '../../../helpers/react-query';
import Layout from '../../../page-components/layout';

const CartItems = () => {

	const user=Cookies.get('user');
	const [cartItems,setCartItems]=useState([]);
	const { data: activeCartData } = useCartData(user);

	
	
	useEffect(() => {
		if (activeCartData) {
      		setCartItems(activeCartData.data);
		}
	}, [ activeCartData]);

	return (
		<Layout>
			<div>
				<AddToCartComponent data={cartItems} />
			</div>
		</Layout>
	);
};

export default CartItems;