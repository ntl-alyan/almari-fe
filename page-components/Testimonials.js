import React from "react";

export default function Testimonial() {
  return (
    <div className="container pt-5 pb-5">
      <h2 className="fw-medium fs-3 pb-4">Testimonials</h2>
      <div className="row row-cols-lg-2 g-4">
        <div className="col">
          <div className="border border-2 border-secondary rounded-2 p-4 p-lg-0 text-center">
            <div className="d-flex flex-column align-items-center gap-2">
              <img
                className="rounded-circle"
                src="/speed.jpeg"
                width={80}
                height={80}
                alt="dp"
              />
              <h2 className="text-secondary fw-bold fs-5">Hammad Tahir</h2>
              <p className="fs-6">CEO & Founder Invision</p>
              <img
                className="py-2"
                src="/quotes.svg"
                width={30}
                height={30}
                alt="quotes"
              />
              <p className="text-secondary fs-6">
                Fashion is like eating, you shouldn't stick to the same menu.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div
            className="bg-danger bg-cover h-100 rounded-2 p-4 text-center"
            style={{
              backgroundImage: "url(/cta-banner.jpg)",
            }}
          >
            <div className="bg-white bg-opacity-75 rounded-2 py-4 p-sm-4 d-grid gap-3">
              <button className="btn btn-dark p-2 rounded-2">
                25% DISCOUNT
              </button>
              <h2 className="fw-bold fs-2 text-dark">
                Winter Collection
              </h2>
              <p className="text-secondary fs-5">
                Starting @ Rs. 2000 <b>Shop Now</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
