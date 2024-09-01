import Image from "next/image";
import React from "react";

const ProductCard = ({ img, title, desc, rating, price }) => {
  const generateRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${
            i <= rating ? "bi-star-fill" : "bi-star"
          } text-warning fs-4 me-1`}
        ></i>
      );
    }
    return <div className="d-flex">{stars}</div>;
  };

  return (
    <div className="p-4 border border-2 border-secondary rounded-3">
      <div className="text-center mb-3">
        <Image
          className="w-100"
          src={img}
          width={200}
          height={200}
          alt={title}
        />
      </div>

      <div className="py-2">
        <h2 className="text-dark fw-medium text-uppercase">{title}</h2>
        <p className="text-secondary">{desc}</p>
        <div>{generateRating(rating)}</div>

        <div className="fw-bold d-flex align-items-center gap-3 mt-2">
          Rs. {price}
          <del className="text-secondary fw-normal">
            Rs. {parseInt(price) + 1000}.00
          </del>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
