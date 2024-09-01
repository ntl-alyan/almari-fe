
export const almariService={
	loginCustomer,
	signupCustomer,
	addToCart,
	getCartItems,
	createOrder,
	getOrders,
	findOrderByID,
	predictModel,
	getUserProfile,
	allPendingOrders,
	updateOrder,
	deleteFromCart,
	verifyOTP,
	generateOTP
}

const almariURL='http://localhost:3020/';
const flaskURL='http://localhost:5001/'

async function loginCustomer(params)
{
	let apiUrl=`${almariURL}user/login`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function signupCustomer(params){
	let apiUrl=`${almariURL}user/signup`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function addToCart(params){
	let apiUrl=`${almariURL}user/addToCart`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function getCartItems(params){
	let apiUrl=`${almariURL}user/getCart/${params}`
	const postOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
		
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function fetchData(url, options = {}) {
	try {
	  const response = await fetch(url, options);
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('Error during fetch:', error);
	  throw error; 
	}
  }

  async function createOrder(params){
	let apiUrl=`${almariURL}orders/createOrder`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function updateOrder(params){
	let apiUrl=`${almariURL}orders/updateOrder`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function verifyOTP(params){
	let apiUrl=`${almariURL}otp/verify`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function generateOTP(params){
	let apiUrl=`${almariURL}otp/generate`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function deleteFromCart(params){
	let apiUrl=`${almariURL}user/removeCartData/${params}`
	const postOptions = {
		method: 'DELETE',
		headers: {
		  'Content-Type': 'application/json',
		},
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}


async function getOrders(params){
	let apiUrl=`${almariURL}orders/findUserOrders/${params}`
	const postOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
		
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function allPendingOrders(){
	let apiUrl=`${almariURL}orders/allPendingOrders`
	const postOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
		
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}

async function findOrderByID(params){
	let apiUrl=`${almariURL}orders/findOrderByID/${params}`
	const postOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
		
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}
  
async function predictModel(params){
	let apiUrl=`${flaskURL}predict`
	const postOptions = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(
		  params
		),
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}


async function getUserProfile(params){
	let apiUrl=`${almariURL}user/userProfile/${params}`
	const postOptions = {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json',
		},
		
	  };
	  
	  try {
		const data = await fetchData(apiUrl, postOptions);
		return data;
	  } catch (error) {
		console.error('Error posting data:', error);
	  }
}