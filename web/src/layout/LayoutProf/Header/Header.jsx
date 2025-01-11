/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// const token = localStorage.getItem('TOKEN');
const userRole = localStorage.getItem('USER_ROLE');
const userID = localStorage.getItem('USER_ID');

// const userId = localStorage.getItem('USER_ID');

// const isAuthenticated = token && userRole && userId;
// const isAdmin = userRole === 'admin';
const isProf = userRole === 'Professeurs';

const Header = () => {
  const [isBottom, setIsBottom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the header element
    const header = document.querySelector('.site-navbar');

    // Function to toggle the 'sticky' class based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;


      if (scrollPosition > 100) {
        header.classList.add('sticky');
        setIsBottom(true);
      } else {
        header.classList.remove('sticky');
        setIsBottom(false);
      }

      // Check if scrolled to the bottom

    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeOnOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USER_ROLE');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('PROFID');
    localStorage.removeItem('USERNOM');
    localStorage.removeItem('ISFIRST');

  
    // Perform navigation without page refresh
    navigate('/');
  };



  return (
    <header className="site-navbar js-sticky-header site-navbar-target" role="banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-lg-2">
            <h1 className="mb-0 site-logo">
              <Link to="/" className={`mb-0 ${isBottom ? 'black-title' : ''}`}>AbesSystem</Link>
            </h1>
          </div>
          <div className="col-12 col-md-10 d-none d-lg-block">
            <nav className="site-navigation position-relative text-right" role="navigation">
              <ul className=" site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                {!isProf && (
                  <>
                    <li><a href="#propre" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>à propos de</a></li>
                    <li><a href="#services" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Services</a></li>
                    <li><Link to="/login" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Connexion</Link></li>
                  </>
                )}
                {isProf && (
                  <>
                    <li className="nav-item" style={{ position: 'relative' }}>
                      <button
                        className="nav-link"
                        style={{ color: isBottom ? 'black' : 'white' }}
                        onClick={toggleDropdown}
                      >
                        Filière <i className="icofont icofont-arrow-down" style={{ marginRight: '5px' }}></i>
                      </button>
                 
                    </li>
                    <li><Link to={`/profil/${userID}`} className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Profile</Link></li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="nav-link"
                        style={{ color: isBottom ? 'black' : 'white', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        déconnexion
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <div className="col-6 d-inline-block d-lg-none ml-md-0 py-3" style={{ position: 'relative', top: 3 }}>
            <a href="#" className="burger site-menu-toggle js-menu-toggle" data-toggle="collapse" data-target="#main-navbar">
              <span />
            </a>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
