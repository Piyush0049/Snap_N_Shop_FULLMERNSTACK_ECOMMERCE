import React from 'react';
import successful from "./1cbd3594bb5e8d90924a105d4aae924c.gif";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Success = () => {
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
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop : windowWidth >= 692 ? '60px' : '90px', paddingBottom : windowWidth >= 692 ? null : '90px' }}>
        <Link to="/mycart" style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>
      <div style={styles.content}>
        <img src={successful} alt="Animated GIF" style={styles.image} />
        <h2 style={{ position: "relative", bottom: "130px", fontSize: windowWidth >= 692 ? null : "50px"}}>Payment Successful!</h2>
        <Link style={{ position: "relative", bottom: "115px", fontSize: windowWidth >= 692 ? '22px' : '45px', textDecoration: "none" }} to="/myorders">See Your Orders...</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: window.innerWidth >= 692 ? '1000px' : '3000px', // Adjusted height based on window width
    minWidth: window.innerWidth >= 692 ? '1540px' : '1540px',
    height: "auto",
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    textAlign: "center",
    position: "relative",

  },
  hr2: {
    borderWidth: "2px",
    opacity: 0.6,
    width: "300px",
  },
  image : {
    height : window.innerWidth >= 692 ? null : '100px',
    width : window.innerWidth >= 692 ? null : '100px',
  }
};

export default Success;

