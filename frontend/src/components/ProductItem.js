import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProductItem({ product, innerWidth }) {

  console.log(innerWidth + "kspksp");
  const cardStyle = {
    width: innerWidth >= 692 ? null : '370px', // Full width for smaller screens
    height: innerWidth >= 692 ? null : "600px",
    borderRadius: '10px',
    transition: 'transform 0.3s',
    boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: "50px"
  };

  const hoverStyle = {
    transform: 'scale(1.05) translateY(-5px)',
    boxShadow: '8px 16px 16px rgba(0, 0, 0, 0.2)',
    cursor: "pointer"
  };

  const ratings = {
    edit: false,
    size: 19,
    isHalf: true,
    value: product.averageRating,
    activeColor: '#ffd700',
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fas fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const priceButtonStyle = {
    backgroundColor: '#5ABCE6',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid white',
    fontSize: "20px"
  };

  const priceButtonHoverStyle = {
    backgroundColor: '#62C4C6',
    color: 'black',
    border: '1px solid white'
  };

  const rev = `...Reviews(${product.numberofrev})`;

  const price = `₹${product.price}`;

  const navigate = useNavigate();

  const handleCardClick = () => {
    scrollToTop();
    navigate(`/product/${product._id}`);
  };

  // Initialize hover state using useState hook
  const [hover, setHover] = useState(false);
  const [bodyhover, setbodyHover] = useState(false);

  return (
    <div style={{ marginBottom: '50px', marginLeft: '100px', position: 'relative', marginTop: "70px" }}>
      <div className="card" onClick={handleCardClick} style={{ ...cardStyle, transition: 'transform 0.3s', ...(bodyhover ? hoverStyle : null) }} onMouseEnter={() => setbodyHover(true)}
        onMouseLeave={() => setbodyHover(false)} >
        <img
          src={product.images[0].url}
          className="card-img-top"
          alt="..."
          style={{ backgroundColor: '#B3F7F8', height: window.innerWidth >= 692 ? "300px" : "400px" }}
        />

        <div className="card-body" style={{ backgroundColor: '#62C4C6', borderRadius: '10px' }}>
          <h5 className="card-title" style={{ fontSize: '35px' }}>{product.name}</h5>  {/* Adjust font size for smaller screens */}
          <p className="card-text" style={{ fontSize: '25px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</p>
          <Link to={`/product/${product._id}`}>
            <h6 style={{ color: 'black', marginBottom: '2px' }}>
              <span
                style={{ ...priceButtonStyle, ...(hover ? priceButtonHoverStyle : null) }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {price}
              </span>
            </h6>
          </Link>
          <span style={{ position: "relative", left: "140px", bottom: "30px", fontFamily: "monospace", fontSize: '25px' }}>{rev}</span>
          {/* Adjust font size for reviews */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', fontSize: "40px" }}>
            <ReactStars {...ratings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

