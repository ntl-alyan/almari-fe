import HeaderTop from "./HeaderTop";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderMain from "./HeaderMain";
import Navbar from "./Navbar";
import MobNavbar from "./MobNavBar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import {useEffect} from 'react'
import Router  from "next/router";



export default function Layout({ children }) {

  const user = Cookies.get('user');

  useEffect(() => {
    isCookieExit()
  }, [])

  const isCookieExit = async () => {
    const username=Cookies.get('user');

    if(!username)
    {
      Router.push('/Login');
    }
  }

  return (
    
    <main>
      <HeaderTop />
      <HeaderMain user={user}/>
      {/* <MobNavbar /> */}
      <Navbar />
      
      {children}
      <Footer />
    </main>
  );
}
