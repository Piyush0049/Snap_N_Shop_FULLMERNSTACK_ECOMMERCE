import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productdetails, productreview } from './actions/productActions';
import { useParams } from 'react-router-dom';
import backimage from './snapedit_1709804086088.jpeg';
import ReactStars from 'react-rating-stars-component';
import Carousal from "react-material-ui-carousel"
import { useNavigate } from 'react-router-dom';
import { addtocart } from './actions/cartactions';
function Prodpage() {
  const { isAuthenticated, user } = useSelector((state) => state.userdetails);
  const [showReviews, setShowReviews] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [addrev, setaddrev] = useState(false)
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


  const subreview = () => {
    if (isAuthenticated) {
      if (addrev) {
        setaddrev(false);
      } if (!addrev) {
        setaddrev(true);
      }
      console.log("you can add review")
    }
    else {
      navigate("/login")
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(productdetails(id));
    }
  }, [dispatch, id]);

  const { product } = useSelector((state) => state.productdetails);
  const ratings = {
    edit: false,
    size: 22,
    isHalf: true,
    value: product.averageRating,
    activeColor: '#ffd700',
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fas fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
  }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const [hoverp, setHoverp] = useState(false);
  const [hoveri, setHoveri] = useState(false);
  const [hoverd, setHoverd] = useState(false);
  const [hoverr, setHoverr] = useState(false);

  const ButtonHoverStyle = {
    backgroundColor: 'white', // Change background color on hover
    color: 'black'
  };


  const { _id } = useSelector((state) => state.userdetails.user);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      background: `url(${backimage}) center/cover`,
      minHeight: windowWidth >= 692 ? '1000px' : '2700px',  // Adjusted height based on window width
      minWidth: windowWidth >= 692 ? '1540px' : '1540px',
      height: "auto",
      width: "auto",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      backgroundRepeat: 'repeat', // Add this line to make the image repeat
    },
    mainContent: {
      width: '100%',
      maxWidth: windowWidth >= 692 ? '1200px' : '1540px',
      minHeight: windowWidth >= 692 ? "1000px" : '1640px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '10px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      display: 'flex',
      marginTop: '40px',
    },
    productInfo: {
      flex: '1',
      marginRight: '40px',
    },
    imageContainer: { // Container for the product image
      marginBottom: '20px',
      width: '100%', // Adjusted width
      height: "auto",
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
    },
    image: { // Product image
      width: '100%', // Adjusted width
      height: 'auto',
      borderRadius: '10px',
    },
    reviewsHeading: {
      fontSize: windowWidth >= 692 ? '24px' : '45px',
      fontWeight: 'bold',
      marginTop: "17px",
      marginBottom: '20px',
      cursor: 'pointer',
    },
    reviewCard: {
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    },
    username: {
      fontSize: windowWidth >= 692 ? "18px" : '40px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
    },
    comment: {
      fontSize: windowWidth >= 692 ? "16px" : '32px',
      color: '#333',
      marginBottom: '10px',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    rating: {
      backgroundColor: '#ffd700',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      textAlign: 'center',
      lineHeight: '24px',
      fontWeight: 'bold',
      fontSize: windowWidth >= 692 ? "14px" : '28px',
      color: '#333',
      marginRight: '8px',
    },
    ratingText: {
      fontSize: windowWidth >= 692 ? "16px" : '30px',
      color: '#333',
    },
  };
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);


  const handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log(comment)
  };

  const handleRatingChange = (e) => {
    var rate = (Number(e.target.value));
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review added")
    console.log(id)
    console.log(rating)
    console.log(comment)
    dispatch(productreview(id, rating, comment))
    setShowReviews(!showReviews)
  };

  const additem = () => {
    window.alert("Item added")
    dispatch(addtocart(id, quantity, _id))
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.productInfo}>
          <div style={styles.imageContainer}> {/* Container for the product image */}
            <Carousal>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    key={item.url}
                    src={item.url}
                    alt={`Product Image ${i + 1}`}
                    style={styles.image} // Product image
                  />
                ))}
            </Carousal>
          </div>
          <ReactStars {...ratings} />
          {!showReviews && (
            <h6 style={styles.reviewsHeading} onClick={toggleReviews}>
              ...Reviews({product.numberofrev})
            </h6>
          )}
          {showReviews && (
            <>
              <div>
                <h4 style={styles.reviewsHeading} onClick={toggleReviews}>
                  Reviews:
                </h4>
              </div>
              {!product.reviews ? (
                <h3 style={styles.username}>No reviews to display</h3>
              ) : (
                product.reviews.map((item) => (
                  <div key={item._id} style={styles.reviewCard}>
                    <h3 style={styles.username}>{item.username}</h3>
                    <p style={styles.comment}>{item.comment}</p>
                    <div style={styles.ratingContainer}>
                      <div style={styles.rating}>{item.rating}</div>
                      <span style={styles.ratingText}>({item.rating} out of 5 stars)</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

        </div>

        <div style={{ marginRight: "190px" }}>
          <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />
          <h1 style={{ fontSize: windowWidth >= 692 ? "32px" : '60px', marginBottom: '20px', fontWeight: 'bolder', color: '#333' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: windowWidth >= 692 ? "18px" : '35px', marginBottom: '30px', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />

          <h1 style={{ fontSize: windowWidth >= 692 ? "36px" : '55px', marginBottom: '20px', fontWeight: 'bold', color: '#333', marginTop: "4px" }}>
            ₹{product.price}
          </h1>
          <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />

          <p style={{ fontSize: windowWidth >= 692 ? "18px" : '40px', marginBottom: '20px', lineHeight: '1.6', display: "flex" }}>
            <p style={{ fontWeight: 'bold' }}> Category : </p> <p style={{ marginLeft: "5px" }}>{product.category}</p>
          </p>
          <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            {product.stock > 0 ?
              (<button
                disabled={false}
                onClick={() => { additem() }}
                style={{
                  backgroundColor: '#38B7EC',
                  color: '#fff',
                  padding: '10px 17px',
                  borderRadius: '18px',
                  border: 'none',
                  fontSize: windowWidth >= 692 ? "18px" : '40px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', ...(hoverp ? ButtonHoverStyle : null)
                }}
                onMouseEnter={() => setHoverp(true)}
                onMouseLeave={() => setHoverp(false)}
              >
                Add to Cart
              </button>) :
              (<button
                disabled={true}
                style={{
                  backgroundColor: '#1192C8',
                  color: '#fff',
                  padding: '10px 17px',
                  borderRadius: '18px',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', ...(hoverp ? ButtonHoverStyle : null)
                }}
                onMouseEnter={() => setHoverp(true)}
                onMouseLeave={() => setHoverp(false)}
              >
                Add to Cart
              </button>)
            }
          </div>

          <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <h5 style={styles.username}>Quantity : </h5>
            <div style={{ marginLeft: "10px", marginBottom: "8px" }}>
              <button
                onClick={handleDecrement}
                style={{
                  backgroundColor: '#5ABCE6',
                  color: '#fff',
                  padding: '1px 7px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: windowWidth >= 692 ? "18px" : '38px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  marginRight: '10px', ...(hoverd ? ButtonHoverStyle : null)
                }}
                onMouseEnter={() => setHoverd(true)}
                onMouseLeave={() => setHoverd(false)}
              >
                -
              </button>
              <span style={{ fontSize: windowWidth >= 692 ? "18px" : '40px', color: '#333' }}>{quantity}</span>
              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                style={quantity >= product.stock ? {
                  backgroundColor: 'gray',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '18px',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  marginLeft: '10px',
                  ...(hoveri ? ButtonHoverStyle : null)
                } : {
                  backgroundColor: '#5ABCE6',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: windowWidth >= 692 ? "18px" : '38px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  marginLeft: '10px',
                  ...(hoveri ? ButtonHoverStyle : null)
                }}
                onMouseEnter={() => setHoveri(true)}
                onMouseLeave={() => setHoveri(false)}
              >
                +
              </button>

            </div>
          </div>
          <div>
            {product.stock > 0 ?
              (<p style={{ fontSize: windowWidth >= 692 ? "18px" : '40px', color: '#666', lineHeight: '1.6', fontWeight: "bold" }}>

                Status : <span style={{ fontSize: windowWidth >= 692 ? "18px" : '40px', color: "green" }}>Instock</span>
              </p>) :
              (<p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', fontWeight: "bold" }}>

                Status : <span style={{ fontSize: windowWidth >= 692 ? "18px" : '40px', color: "red" }}>Out Of Stock</span>
              </p>)
            }
            <hr style={{ height: "3px", borderWidth: "2px", borderColor: "black", width: "250px", marginLeft: "2px", color: "black" }} />
            <button
              onClick={() => subreview()}
              style={{
                marginLeft: "100px",
                backgroundColor: '#0A75A2',
                color: '#fff',
                padding: '10px 17px',
                borderRadius: '25px',
                border: 'none',
                fontSize: windowWidth >= 692 ? "18px" : '45px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', ...(hoverr ? ButtonHoverStyle : null)
              }}
              onMouseEnter={() => setHoverr(true)}
              onMouseLeave={() => setHoverr(false)}
            >
              Submit Review/Rating
            </button>
          </div>
          {addrev ? (
            <>
              <div style={{
                maxWidth: "400px",
                margin: "auto",
                textAlign: "center",
                marginTop: "140px",
                marginRight: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "20px",
                backgroundColor: "#f9f9f9"
              }}>
                <h2 style={{
                  marginBottom: "20px",
                  fontFamily: "Arial, sans-serif",
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: windowWidth >= 692 ? "18px" : '45px',
                }}>Add Product Review</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={user.username}
                      style={{
                        padding: "12px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        fontSize: "1rem"
                      }}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <textarea
                      placeholder="Your Comment"
                      value={comment}
                      onChange={handleCommentChange}
                      style={{
                        padding: "12px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        minHeight: "100px",
                        fontSize: windowWidth >= 692 ? "15px" : '40px',
                      }}
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <select
                      value={rating}
                      onChange={handleRatingChange}
                      style={{
                        padding: "12px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        boxSizing: "border-box",
                        fontSize: windowWidth >= 692 ? "15px" : '40px',
                      }}
                      required
                    >
                      <option value={0} onClick={() => setRating(null)}>Select Rating</option>
                      <option value={1} onClick={() => setRating(1)}>1 Star</option>
                      <option value={2} onClick={() => setRating(2)}>2 Stars</option>
                      <option value={3} onClick={() => setRating(3)}>3 Stars</option>
                      <option value={4} onClick={() => setRating(4)}>4 Stars</option>
                      <option value={5} onClick={() => setRating(5)}>5 Stars</option>
                    </select>
                  </div>
                  <button type="submit" style={{
                    padding: "12px 24px",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    fontSize: windowWidth >= 692 ? "18px" : '45px',
                    fontWeight: "bold"
                  }}>
                    Submit Review
                  </button>
                </form>
              </div>
            </>
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}

export default Prodpage;
