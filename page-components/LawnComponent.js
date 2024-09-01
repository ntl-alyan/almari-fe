
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import CardComponent from './CardComponent';
import Layout from './layout';

function LawnComponent() {
	const [data, setData] = useState([]);
	const [cardData, setCardData] = useState([]);
  
	const prepareCardData = (data) => {
	  let productData = [];
	  data.forEach((element, index) => {
		productData.push({
		  image: 'https:' + element.image,
		  title: element.title,
		  description: element.description,
		  price: element.price,
		  type:'Lawn'
		});
	  });
	  setCardData(productData);
	};
  
	const fetchData = async () => {
	  try {
		const response = await fetch('/bechtree.csv'); // Replace with the path to your CSV file
		const blob = await response.blob();
		const reader = new FileReader();
  
		reader.onload = () => {
		  const text = reader.result;
		  // Convert CSV text to JSON
		  const jsonData = convertCSVToJson(text);
		  setData(jsonData);
		  prepareCardData(jsonData);
		};
  
		reader.readAsText(blob);
	  } catch (error) {
		console.error('Error fetching data:', error);
	  }
	};
  
	useEffect(() => {
	  fetchData();
	}, []);
  
	const convertCSVToJson = (csv) => {
	  const parsedData = Papa.parse(csv, { header: true });
	  return parsedData.data;
	};
  return (
	<>
	
		<CardComponent data={cardData}/>

	  </>
	  
  )
}

export default LawnComponent