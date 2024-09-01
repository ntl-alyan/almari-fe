import React,{useEffect,useState} from 'react'
import Papa from 'papaparse';
import CardComponent from '../../../page-components/CardComponent';
import Layout from '../../../page-components/layout';
import { almariService } from '../../../services/customer';
import { useRouter } from "next/router";

// import {scrappedDataService} from "../../services/dataFetching"

export default function MatchingItems ()  {
    const router = useRouter();
    let { image_url,type } = router.query;

	const [data, setData] = useState([]);
	const [cardData,setCardData]=useState([]);

	const prepareCardData=(data)=>{
		let productData=[];
		data.forEach((element,index) => {
			productData.push({
				image: element.image.includes('https:') ? element.image : 'https:'+element.image ,
				title:element.title,
				description:element.description,
				price:element.price.replace('PKR ', '')
			})
		}); 
		setCardData(productData);
	}

  const fetchData = async () => {
    const typesArray = type ? type.split(',') : [];
    
    const payload={
        image_url:image_url,
        type:typesArray
    }
    const response=await almariService.predictModel(payload);

    if(response)
    {
        prepareCardData(response.matching_rows);
    }
  };

  useEffect(() => {
    if(image_url)
    {
        fetchData();
    }
  }, [image_url]);


  return (
    <Layout>
      <div>
          <CardComponent data={cardData} />
      </div>
    </Layout>
    );
};