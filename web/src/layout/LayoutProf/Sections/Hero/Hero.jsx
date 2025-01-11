/* eslint-disable prettier/prettier */
import React from 'react'
import pic1 from '../../../../assets/images/pic1.png'


const Hero = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay={200}>
          <h1>Manage Absences in a Click</h1>
          <h2>ABÉS: The go-to app for schools, making absence management as simple as a click. Stay organized, save time, and focus on what matters most: student success.</h2>
          <div className="d-flex justify-content-center justify-content-lg-start">
            <a href="#about" className="btn-get-started scrollto">Download App</a>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay={200}>
          <img src={pic1} className="img-fluid animated" alt="img1" />
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero