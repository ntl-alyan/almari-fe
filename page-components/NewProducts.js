import React from "react";
import ProductCard from "./ProductCard";

const productsData = [
  {
    img: "/jacket-1.jpg",
    title: "Jacket",
    desc: "MEN Yarn Fleece Full-Zip Jacket",
    rating: 4,
    price: "4500.00",
  },
  {
    img: "/party-wear-1.jpg",
    title: "Heels",
    desc: "Women's Party Wear Shoes",
    rating: 3,
    price: "2500.00",
  },
  {
    img: "/shirt-1.jpg",
    title: "Shirt",
    desc: "Pure Garment Dyed Cotton Shirt",
    rating: 4,
    price: "4500.00",
  },
  {
    img: "/sports-1.jpg",
    title: "Sports",
    desc: "Trekking & Running Shoes - Black",
    rating: 3,
    price: "5800.00",
  },
  {
    img: "/watch-1.jpg",
    title: "Watches",
    desc: "Smart Watches Vital Plus",
    rating: 4,
    price: "10000.00",
  },
  {
    img: "/watch-2.jpg",
    title: "Watches",
    desc: "Pocket Watch Leather Pouch",
    rating: 4,
    price: "12000.00",
  },
];

export default function NewProducts() {
  return (
    <div>
      <div className="container pt-5">
        <h2 className="fw-medium fs-3 pb-4">New Products</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {productsData.map((item, index) => (
            <div key={index} className="col mt-4">
              <ProductCard
                img={item.img}
                title={item.title}
                desc={item.desc}
                rating={item.rating}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

