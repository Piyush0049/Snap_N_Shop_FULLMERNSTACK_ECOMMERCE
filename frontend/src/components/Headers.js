import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import profilepic from "./snap--shop-high-resolution-logo.png"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteuser, userlogout } from './actions/useractions';
import {
  useEffect

} from 'react';
function Headers() {
  const dispatch = useDispatch();
  const headerStyle = {
    position: 'fixed', // Fix the header position
    top: 0, // Place at the top
    width: '100%', // Make it span the entire width
    zIndex: 999, // Ensure it appears above other content
    backgroundColor: 'black',
    opacity: 0.7,
    color: '#ffffff',
  };
  const { cartitems } = useSelector((state) => state.cart)
  const { isAuthenticated, user } = useSelector((state) => state.userdetails);
  const [showMessage, setShowMessage] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  


  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.setItem("cartitem", "");
      localStorage.setItem("shippingdetails", null);
      dispatch(userlogout());

    }
  }
  const deleteaccount = () => {
    if (window.confirm("Are you sure you want to DELETE your Account?")) {
      dispatch(deleteuser());
    }
  }
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  };

  const { _id } = useSelector((state) => state.userdetails.user);
  let selectedproducts = cartitems.filter((item) => item.user_id === _id);
  console.log(selectedproducts);

  console.log(selectedproducts)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log(windowWidth)
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const a =  windowWidth >= 692 ? "0" : '2' ;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontSize: windowWidth >= 692 ? "20px" : '60px' }}>Snap & Shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Home" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/myorders" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>My Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>Search<i className="fa-solid fa-magnifying-glass" style={{ fontSize: windowWidth >= 692 ? "17px" : '45px' }}></i></Link>
              </li>


              <li className="nav-item">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>
                  Your Account<i className="fa-solid fa-user" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}></i>
                </a>
                <ul className="dropdown-menu" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px', position:  'absolute', top: '100%', left: windowWidth > 768 ? "32%" : "190px", transform: 'translateX(-50%)' }}>
                  {isAuthenticated && user.work === "admin" &&
                    (<li><Link className="dropdown-item" to="/dashboard"><b>Dashboard</b></Link></li>)
                  }

                  {!isAuthenticated ?
                    (<li><Link className="dropdown-item" to="/login">Log In</Link></li>)
                    :
                    (null)
                  }

                  <li><Link className="dropdown-item" to="/account">My Account</Link></li>
                  {isAuthenticated ?
                    (<><li><Link className="dropdown-item" to="/login">Switch Account</Link></li>
                      <li><Link className="dropdown-item" onClick={() => logout()}>Log Out</Link></li>
                      <li><Link className="dropdown-item" onClick={() => deleteaccount()}>Delete Account</Link></li>
                    </>)
                    :
                    (null)
                  }
                </ul>

              </li>
              <li className="nav-item">
              {isAuthenticated && (
                <li className="nav-item" >
                  <Link className="nav-link" to="/mycart" style={{ fontSize: windowWidth >= 692 ? "15px" : '45px' }}>My Cart<i className="fa-solid fa-cart-shopping" style={{ fontSize: windowWidth >= 692 ? "20px" : '45px' , marginTop: "3px" }}></i>
                    <span className={`position-absolute top-${a} start-45 translate-middle badge rounded-pill bg-danger`} style={{ width: windowWidth >= 692 ? "17px" : '30px' , height: windowWidth >= 692 ? "17px" : '30px' , fontSize: windowWidth >= 692 ? "10px" : '25px' , textAlign: "center", marginTop: windowWidth > 768 ? "18px" : null, marginBottom : windowWidth > 768 ? null : "25px", marginLeft : "5px",   display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <p style={{ margin: "0" }}>
                        {cartitems.length}</p>
                    </span>
                  </Link>

                </li>
              )}
              </li>
              <li className="nav-item">
              {isAuthenticated && (
                <>
                  <img onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)} src={profilepic} alt="Uploaded" style={{ width: windowWidth > 768 ? "40px" : "75px", height:  windowWidth > 768 ? "40px" : "75px" , borderRadius: "100%", marginLeft : windowWidth > 768 ? "10px" : null}} />
                  {showMessage && (
                    <div
                      style={{
                        position: 'absolute',
                        
                        top: '100%',
                        left: windowWidth > 768 ? "50%" : "350px",
                        transform: 'translateX(-50%)',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '10px 20px',
                        whiteSpace: "nowrap",
                        borderRadius: '5px',
                        fontSize: windowWidth > 768 ? "13px" : "30px",
                        zIndex: '999',
                      }}
                    >
                      Welcome, {user.username}. You are currently logged in.
                    </div>)}
                </>
              )}
              </li>


              

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );

}
export default Headers;

