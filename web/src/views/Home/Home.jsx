/* eslint-disable prettier/prettier */
// import React, { useEffect } from 'react';

import Header from 'layout/LayoutProf/Header/Header'
import Footer from 'layout/LayoutProf/Footer/Footer'
import MobileWrap from '../../layout/LayoutProf/Sections/Hero/MobileWrap'
import Main from '../../layout/LayoutProf/Sections/Hero/Main'

const Home = () => {

  // useEffect(() => {
  //   const headerScrolled = () => {
  //     const header = document.getElementById('header');
  //     if (header) {
  //       if (window.scrollY > 100) {
  //         header.classList.add('header-scrolled');
  //       } else {
  //         header.classList.remove('header-scrolled');
  //       }
  //     }
  //   };

  //   window.addEventListener('load', headerScrolled);
  //   window.addEventListener('scroll', headerScrolled);

  //   return () => {
  //     window.removeEventListener('load', headerScrolled);
  //     window.removeEventListener('scroll', headerScrolled);
  //   };
  // }, []);


  return (
    <div className="site-wrap">
    <MobileWrap />
    <Header />
    <Main />
    <Footer />

  </div>




  )
}

export default Home