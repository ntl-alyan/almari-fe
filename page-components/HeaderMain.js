/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCartData } from "../helpers/react-query";
import { useQueryClient } from "react-query";

export default function HeaderMain({ user }) {
  const [cartItems, setCartItems] = useState(0);
  const queryClient = useQueryClient();
  const { data: activeCartData } = useCartData(user);

  useEffect(() => {
    if (activeCartData) {
      setCartItems(activeCartData.data.length);
    }
  }, [activeCartData]);

  return (
    <div className="border-bottom py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="font-weight-bold display-4 text-center text-black mb-3 mb-sm-0" style={{ fontFamily: 'revert-layer', letterSpacing: '2px' }}>
          Almari
        </div>

        <div className="d-none d-lg-flex gap-4 text-muted h3">
          <div className="position-relative">
            <a href="/Users">
              <BiUser />
            </a>
          </div>

          <div className="position-relative">
            <a href="/CartItems">
              <HiOutlineShoppingBag />
            </a>
            <div className="bg-danger rounded-circle position-absolute top-0 end-0 d-flex justify-content-center align-items-center text-white" style={{ width: '18px', height: '18px', fontSize: '12px', transform: 'translate(25%, -25%)' }}>
              {cartItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
