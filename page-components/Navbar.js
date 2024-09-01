import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {

  const [priority, setPriority] = useState(null);

  useEffect(() => {
    setPriority(Cookies.get('priority'));
  }, []);


  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <div className="d-flex gap-4 mx-auto py-2 justify-content-center">
          {
            priority === 'ADMIN' ? (
              
              <div className="d-flex gap-4 mx-auto  justify-content-center">
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/">HOME</Link>
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="#">CATEGORIES</Link>
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/AddAdmin">Add Admin</Link>
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/ViewAllOrders">All Pending Orders</Link>
              </div>
            ) : (
              <div className="d-flex gap-4 mx-auto  justify-content-center">
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/">HOME</Link>
                  <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="#">CATEGORIES</Link>
                <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/Shoes">SHOES</Link>
                <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/Lawns">LAWNS</Link>
                <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/Suits">SUITS</Link>
                <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/Trousers">TROUSERS</Link>
                <Link className="nav-link text-uppercase fw-bold px-3 py-2" href="/OrderDetails">View My Orders</Link>
              </div>
            )
          }
          
        </div>
      </div>
      <style jsx>{`
        .nav-link {
          color: #555;
          transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }
        .nav-link:hover {
          color: #fff;
          background-color: #007bff;
          border-radius: 4px;
        }
        .nav-link.active {
          color: #fff;
          background-color: #0056b3;
          border-radius: 4px;
        }
        .navbar {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </nav>
  );
}
