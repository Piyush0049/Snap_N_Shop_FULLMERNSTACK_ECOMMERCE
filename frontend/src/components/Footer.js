import React from 'react';
import {Link}  from 'react-router-dom';
import { useState} from 'react';
import { useEffect } from 'react';
function Footer() {
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
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center', // Set position to fixed
    bottom: 0, // Make it span the entire width
    minHeight: windowWidth >= 692 ? '250px' : '400px', // Adjusted height based on window width
    height : "auto",
    minWidth: windowWidth >= 692 ? '1540px' : '1540px',
    width : "auto"
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const hrStyle = {
    margin: '20px 0',
  };
  
  return (
    <div>
      <footer style={footerStyle}>
        <div style={containerStyle}>
          <div style={{marginRight : "90px"}}>
            <h3 style={{fontSize : windowWidth >= 692 ? "15px" : '40px'}}>About Us</h3>
            <p style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>"Snap & Shop" revolutionizes online shopping by integrating cutting-edge image recognition technology.</p>
          </div>
          <div style={{marginRight : "160px"}}>
            <h3 style={{fontSize : windowWidth >= 692 ? "15px" : '40px'}}>Contact Us</h3>
            <p style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>Email: S&S@gmail.com</p>
            <p style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>Phone: +94857XXXXX</p>
          </div>
          <div>
            <h3 style={{fontSize : windowWidth >= 692 ? "15px" : '40px'}}>Follow Us</h3>
            <a className="nav-link active mt-2" aria-current="page" href="#" style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>Facebook</a>
            <a className="nav-link active mt-2" aria-current="page" href="#" style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>Twitter</a>
            <a className="nav-link active mt-2" aria-current="page" href="#" style={{width : windowWidth >= 692 ? "220px" : '320px', fontSize : windowWidth >= 692 ? "15px" : '27px'}}>Instagram</a>   
          </div>
        </div>
        <hr style={hrStyle}/>
        <p style={{ fontSize : windowWidth >= 692 ? "15px" : '27px'}}>&copy; 2024 Snap & Shop. All rights reserved.</p>
      </footer>  
    </div>
  );
}

export default Footer;
