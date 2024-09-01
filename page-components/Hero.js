import React from "react";

export default function Hero() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
    };

    const slideData = [
        {
            id: 0,
            img: "/banner-1.jpg",
            title: "Trending Item",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "Rs. 20000 ",
        },
        {
            id: 1,
            img: "/banner-2.jpg",
            title: "Trending Accessories",
            mainTitle: "MODERN SUNGLASSES",
            price: "Rs. 5000",
        },
        {
            id: 2,
            img: "/banner-3.jpg",
            title: "Sale Offer",
            mainTitle: "NEW FASHION SUMMER SALE",
            price: "Rs. 3000",
        },
    ];

    return (
        <div>
            <div className=" d-flex justify-content-center">
                {/* <Slider {...settings}>
                    {slideData.map((item) => (
                        <Slide
                            key={item.id}
                            img={item.img}
                            title={item.title}
                            mainTitle={item.mainTitle}
                            price={item.price}
                        />
                    ))}
                </Slider> */}
                <div className="container pt-6 mt-5 ml-5 d-flex justify-content-center">
                    <img src="/Almarii.png" alt="Banner 1" />
                </div>
            </div>
        </div>
    );
};
