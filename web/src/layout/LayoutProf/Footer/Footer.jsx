/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-4 mb-md-0">
          <h3>ENSAJ</h3>
          <p>Route d'Azemmour, Nationale N°1, ELHAOUZIA. <br /> BP : 5096 El Jadida <br />24002 Maroc <br />tel: (+212) 5 23 34 48 22 <br />fax: (+212) 5 23 39 49 15</p>
         
        </div>
        <div className="col-md-7 ml-auto">
          <div className="row site-section pt-0">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Navigation</h3>
              <ul className="list-unstyled">
                <li><a href="#main">Home</a></li>
                <li><a href="#propre">à propos de</a></li>
                <li><a href="#services">Services</a></li>
              </ul>
            </div>
            
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Downloads</h3>
              <ul className="list-unstyled">
                <li><a href="#">Get from the App Store</a></li>
                <li><a href="#">Get from the Play Store</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-md-7">
          <p className="copyright">© Copyright ENSAJ All Rights Reserved</p>
          <div className="credits">
            {/*
      All the links in the footer should remain intact.
      You can delete the links only if you purchased the pro version.
      Licensing information: https://bootstrapmade.com/license/
      Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=SoftLand
    */}
           
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer