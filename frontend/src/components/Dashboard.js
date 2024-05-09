import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallorders, updatestatus } from "./actions/orderactions"
import { getallusers } from './actions/useractions';
import axios from 'axios';
import { updateproduct } from './actions/productActions';
const Dashboard = () => {
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
  const dispatch = useDispatch();
  const { orderdets } = useSelector((state) => state.allorders)
  const { work } = useSelector((state) => state.userdetails.user);
  const [opt, setopt] = useState("");
  const { orderdet } = useSelector((state) => state.myorders);
  const [selectedorder, setselectedorder] = useState("");
  const [theproduct, settheproduct] = useState("");
  const { user } = useSelector((state) => state.userdetails);
  const [newproduct, setnewproduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: {
      public_id: "public",
      url: ""
    }
  })
  useEffect(() => {
    dispatch(getallorders())
  }, [getallorders]);


  useEffect(() => {
    dispatch(getallusers())
  }, [dispatch, getallusers]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setSelectedStatus(selectedValue);
  }
  const update = () => {
    console.log(selectedStatus + "done")
    dispatch(updatestatus(selectedorder[0]._id, selectedStatus))
    setopt("orders");
  }

  const { allUsers } = useSelector((state) => state.AllUsers);
  const changeroles = async (w, e) => {
    if (w === "admin") {
      const confirmed = window.confirm(`Are you sure you want to change the user's role to USER?`);
      if (!confirmed) {
        return;
      }
    }
    if (w === "user") {
      const confirmed = window.confirm(`Are you sure you want to change the user's role to ADMIN?`);
      if (!confirmed) {
        return;
      }
    }
    console.log("changing")
    const config = {
      "Content-Type": "application/json"
    };
    let data;
    if (w === "admin") {
      const response = await axios.put("/auth/changerole", { email: e, work: "user" }, config);
      data = response.data;
      window.alert(`The role of the user with email : ${e} has been changed to ADMIN`);
    }
    if (w === "user") {
      const response = await axios.put("/auth/changerole", { email: e, work: "admin" }, config);
      data = response.data;
      window.alert(`The role of the user with email : ${e} has been changed to ADMIN.`);
    }

    console.log(data);
  };
  const { allProducts } = useSelector((state) => state.products)
  const thepro = () => {
    if (theproduct !== "") {
      setopt("theproduct")
      setEditedProduct(theproduct)
      seteditimageurl(theproduct[0].images[0].url)
    }
    console.log(theproduct)
  }
  const [editedProduct, setEditedProduct] = useState(null);
  const [editimageurl, seteditimageurl] = useState(editedProduct !== null ? editedProduct[0].images[0].url : "");


  const handleeditimage = (e) => {
    seteditimageurl(e.target.value);

    console.log(editimageurl)
  };


  const handleChange = (index, key, value) => {
    setEditedProduct(prevData => {
      // If prevData is null or not an array, return an empty array
      if (!Array.isArray(prevData)) {
        return [];
      }
      // Create a copy of the array
      const newData = [...prevData];
      // Update the value of the specific key in the object at the given index
      if (newData[index]) {
        newData[index][key] = value;
      }
      return newData;
    });
  }

  const deleteprod = async (id) => {
    if (window.confirm("Are you sure want to delete the product?")) {
      await axios.delete(`/api/v1/product/${id}`);
      window.alert('Product has been deleted successfully!');
    }
  }

  const handleChangenewprod = (e) => {
    const { name, value } = e.target;
    setnewproduct({
      ...newproduct,
      [name]: value
    });
  };

  const handleChangenewprodimage = (e) => {
    const { name, description, price, category, stock, images } = newproduct;

    // Update the images object with the new URL
    const updatedImages = { ...images, url: e.target.value };

    // Update the newproduct state with the new images object
    setnewproduct({
      name,
      description,
      price,
      category,
      stock,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.alert('Product has been updated successfully!');
    const config = {
      "Content-type": "application/json"
    }
    console.log(editimageurl)
    const { data } = await axios.put(`/api/v1/product/${editedProduct[0]._id}`, {
      name: editedProduct[0].name, description: editedProduct[0].description, price: editedProduct[0].price, category: editedProduct[0].category, stock: editedProduct[0].stock, images: {
        public_id: "public",
        url: editimageurl
      }
    }, config);
    console.log(data);
    setopt("products");
    settheproduct("");
  };

  const handlecreatenewprod = async (e) => {
    console.log(newproduct);
    if (window.confirm("Do you really want to create a new product?")) {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      try {
        const { data } = await axios.post("/api/v1/product/create", {
          name: newproduct.name,
          description: newproduct.description,
          price: newproduct.price,
          category: newproduct.category,
          stock: newproduct.stock,
          images: {
            public_id: newproduct.images.public_id,
            url: newproduct.images.url
          }
        }, config);
        console.log(data);
        console.log(newproduct + "smsmps");
      } catch (error) {
        console.error("Error creating new product:", error);
      }
    }
  };

  return (
    <div>
      {work === "admin" ? (
        <div style={{
          backgroundColor: "#ACE7FF", minHeight: windowWidth >= 692 ? '1000px' : '3000px', // Adjusted height based on window width
          minWidth: windowWidth >= 692 ? '1540px' : '1540px',
          height: "auto",
          width: "auto",
        }}>
          <div style={dashboardStyle}>
            <header style={headerStyle}>
              <h1 style={{ position: "relative", top: windowWidth >= 692 ? '50px' : '100px', fontFamily: "monospace", textDecoration: "underline", fontSize: windowWidth >= 692 ? null : '70px', whiteSpace: 'nowrap' }}><b>Admin Dashboard: </b></h1>
              <nav style={navStyle}>
                <ul style={{ display: "flex", textDecoration: "none", listStyle: 'none', position: "relative", left: windowWidth >= 692 ? "160px" : '220px', marginTop: windowWidth >= 692 ? '15px' : '150px', marginBottom: "15px" }}>
                  <li><a style={{ cursor: "pointer", textDecoration: "underline", marginRight: "30px", fontSize: windowWidth >= 692 ? '21px' : '50px', fontFamily: "monospace", color: "gray", transition: "color 0.3s ease", ":hover": { color: "black" }, whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.color = 'black'} onMouseLeave={(e) => e.target.style.color = 'gray'} t onClick={() => { setopt("orders") }}>All Orders</a></li>
                  <li><a style={{ cursor: "pointer", textDecoration: "underline", marginRight: "30px", fontSize: windowWidth >= 692 ? '21px' : '50px', fontFamily: "monospace", color: "gray", transition: "color 0.3s ease", ":hover": { color: "black" }, whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.color = 'black'} onMouseLeave={(e) => e.target.style.color = 'gray'} t onClick={() => { setopt("products") }}>All Products</a></li>
                  <li><a style={{ cursor: "pointer", textDecoration: "underline", marginRight: "30px", fontSize: windowWidth >= 692 ? '21px' : '50px', fontFamily: "monospace", color: "gray", transition: "color 0.3s ease", ":hover": { color: "black" }, whiteSpace: 'nowrap' }} onMouseEnter={(e) => e.target.style.color = 'black'} onMouseLeave={(e) => e.target.style.color = 'gray'} t onClick={() => { setopt("customers") }}>All Users</a></li>
                </ul>
              </nav>
            </header>
            {
              opt === "" &&
              <div style={{ position: "relative", top: "80px", opacity: "0.9", backgroundColor: "#D2F1FE", height: "700px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h1 style={{ fontFamily: "revert-layer", fontSize: windowWidth >= 692 ? '50px' : '100px' }}><b>Welcome, ADMIN!</b></h1>
              </div>
            }
            {
              opt === "orders" && orderdets.length > 0 &&

              <div style={{ position: "relative", top: "80px", opacity: "0.9", backgroundColor: "#D2F1FE", height: windowWidth >= 692 ? '600px' : '1900px', alignItems: "center", justifyContent: "center", overflowY: "auto", minWidth: windowWidth >= 692 ? null : '1300px' }}>
                {orderdets.map((order, index) => (
                  <div key={index} style={styles.product} onClick={() => { setselectedorder(orderdets.filter(ord => ord._id === order._id)); setopt("theorder") }}>
                    <div style={styles.details}>
                      <h3 style={{ marginBottom: '10px', fontSize: windowWidth >= 692 ? '17px' : '45px', fontWeight: 'bold' }}>User_id : {order.user}</h3>
                      <h3 style={{ marginBottom: '10px', fontSize: windowWidth >= 692 ? '16px' : '40px', fontWeight: 'bold' }}>Order_id : {order._id}</h3>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '40px', }}>Total: ₹{order.totalPrice}</p>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '40px', }}>Status: <b>{order.orderStatus}</b></p>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '40px', }}>Place On: <b>{order.createdAt.slice(0, 10)}</b></p>
                    </div>
                    {
                      order.orderitems.map((item, index) => (
                        <img key={index} style={styles.image} src={item.image} alt={order.name} />
                      ))
                    }
                  </div>
                ))}
              </div>
            }

            {opt === "theorder" &&
              <>
                <div style={{ position: "relative", top: "80px", opacity: "0.9", backgroundColor: "#D2F1FE", height: windowWidth >= 692 ? '600px' : '1900px', alignItems: "center", justifyContent: "center", overflowY: "auto" }}>

                  <h1 style={{ position: "relative", top: "20px", left: "30px", fontSize: windowWidth >= 692 ? null : '55px', }}><b>Order Summary: </b></h1>
                  <div style={styles.grandTotalContainer3}>
                    <div style={{ fontSize: windowWidth >= 692 ? '20px' : '40px', whiteSpace: "nowrap" }}>Placed On:</div>
                    <div style={{ fontSize: windowWidth >= 692 ? '20px' : '40px', whiteSpace: "nowrap" }}>{selectedorder[0].createdAt.slice(0, 10)}</div>
                  </div>
                  <ul style={styles.productList}>
                    {selectedorder[0].orderitems.map((product, index) => (
                      <div style={styles.product} key={index}>
                        <img style={styles.image} src={product.image} alt={product.name} />
                        <div style={styles.details}>
                          <h3 style={{ marginBottom: '10px', fontSize: windowWidth >= 692 ? '20px' : '43px', fontWeight: 'bold' }}>{product.name}</h3>
                          <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Price: ₹{product.price}</p>
                          <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Quantity: {product.quantity}</p>
                          <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Total: ₹{product.price * product.quantity}</p>
                        </div>
                      </div>
                    ))}

                  </ul>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: "70px" }}>
                      <h2 style={{ marginBottom: "40px", fontSize: windowWidth >= 692 ? null : '40px', whiteSpace: "nowrap" }}><b>Shipping Address : </b></h2>
                      <div style={styles.grandTotalContainer2}>
                        <div>Address :</div>
                        <div>{selectedorder[0].shippinginfo.address}</div>
                      </div>
                      <div style={styles.grandTotalContainer2}>
                        <div>Country :</div>
                        <div>{selectedorder[0].shippinginfo.country}</div>
                      </div>
                      <div style={styles.grandTotalContainer2}>
                        <div>State :</div>
                        <div>{selectedorder[0].shippinginfo.state}</div>
                      </div>
                      <div style={styles.grandTotalContainer2}>
                        <div>City :</div>
                        <div>{selectedorder[0].shippinginfo.city}</div>
                      </div>
                      <div style={styles.grandTotalContainer2}>
                        <div><b>Order Status :</b></div>
                        <div><b>{selectedorder[0].orderStatus}</b></div>
                      </div>
                    </div>
                    <div style={{ marginLeft: windowWidth >= 692 ? '450px' : '350px' }}>
                      <h2 style={{ fontSize: windowWidth >= 692 ? null : '45px' }}><b>Invoice Details : </b></h2>
                      <div style={styles.grandTotalContainer}>
                        <div>Sub Total:</div>
                        <div>₹{selectedorder[0].itemsPrice}</div>
                      </div>
                      <div style={styles.grandTotalContainer}>
                        <div>GST (18%):</div>
                        <div>₹{selectedorder[0].taxPrice}</div>
                      </div>
                      <div style={styles.grandTotalContainer}>
                        <div>Shipping Charges:</div>
                        <div>₹{selectedorder[0].shippingPrice}</div>
                      </div>
                      <hr style={{ marginTop: '30px', borderWidth: "3px", borderColor: "black" }} />
                      <div style={styles.grandTotalContainer}>
                        <div>Grand Total:</div>
                        <div>₹{selectedorder[0].totalPrice}</div>
                      </div>
                    </div>
                  </div>
                  <select value={selectedStatus} onChange={handleSelectChange} style={{ padding: "7px 20px", position: "relative", bottom: windowWidth >= 692 ? '30px' : '5px', left: "67px", borderRadius: "10px", fontFamily: "serif", fontSize: windowWidth >= 692 ? '22px' : '30px', textDecoration: "bold", marginRight: "20px" }}>
                    <option value="shipped"><b>shipped</b></option>
                    <option value="delivered"><b>delivered</b></option>
                  </select>
                  <button onClick={() => update()} type="button" className="btn btn-warning" style={{ position: "relative", bottom: windowWidth >= 692 ? '34px' : '9px', left: "80px", fontSize: windowWidth >= 692 ? null : '30px' }}>Update Status</button>

                </div>
              </>
            }


            {

              opt === "products" &&

              <div style={{ position: "relative", top: "80px", opacity: "0.9", backgroundColor: "#D2F1FE", height: windowWidth >= 692 ? '600px' : '1700px', alignItems: "center", justifyContent: "center", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                  <button type="button" className="btn btn-primary" onClick={() => setopt("createproduct")} style={{ fontSize: windowWidth >= 692 ? null : '40px' }}>Create New Product</button>
                </div>
                {allProducts.map((product, index) => (
                  <div key={index} style={styles.product} >
                    <img style={styles.image} src={product.images[0].url} alt={product.name} />
                    <div style={styles.details}>
                      <h3 style={{ marginBottom: '10px', fontSize: windowWidth >= 692 ? '17px' : '43px', fontWeight: 'bold' }}>Product Name: {product.name}</h3>
                      <h3 style={{ marginBottom: '10px', fontSize: "16px", fontWeight: 'bold' }}>Product_id : {product._id}</h3>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Description: {product.description}</p>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Stock: <b>{product.stock}</b></p>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Created/Updated By: <b>{product.user}</b></p>
                      <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '38px', }}>Created On: <b>{product.createdAt.slice(0, 10)}</b></p>
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => { settheproduct(allProducts.filter(prod => prod._id === product._id)); thepro() }} style={{ fontSize: windowWidth >= 692 ? null : '40px', }}>Edit Product</button>
                    <i className="fa-solid fa-trash ml-4" style={{ position: "relative", left: "10px", fontSize: windowWidth >= 692 ? null : '25px', }} onClick={() => deleteprod(product._id)}></i>
                  </div>
                ))}
              </div>
            }

            {
              opt === "createproduct" && (
                <div style={style.editProductContainer}>
                  <h1 style={style.editProductHeader}>Edit Product Details:</h1>
                  <form onSubmit={handleSubmit}>
                    <div style={style.product}>
                      <div style={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                        <label htmlFor="name" style={style.label}>New Product's Name:</label>
                        <input type="text" name="name" value={newproduct.name} onChange={handleChangenewprod} style={style.input} />
                        <label htmlFor="description" style={style.label}>New Product's Description:</label>
                        <textarea name="description" value={newproduct.description} onChange={handleChangenewprod} style={style.textarea} />
                        <label htmlFor="price" style={style.label}>New Product's Price (in Rupees):</label>
                        <input type="number" name="price" value={newproduct.price} onChange={handleChangenewprod} style={style.input} />
                        <label htmlFor="category" style={style.label}>New Product's Category:</label>
                        <input type="text" name="category" value={newproduct.category} onChange={handleChangenewprod} style={style.input} />
                        <label htmlFor="stock" style={style.label}>New Product's Stock:</label>
                        <input type="number" name="stock" value={newproduct.stock} onChange={handleChangenewprod} style={style.input} />
                        <label htmlFor="url" style={style.label}>New Product's Image URL:</label>
                        <input type="text" name="url" value={newproduct.images.url} onChange={handleChangenewprodimage} style={style.input} />
                        <label htmlFor="user" style={style.label}>Created/Updated By:</label>
                        <input type="text" name="user" value={user._id} disabled style={style.disabledInput} />
                        {
                          newproduct.name !== "" && newproduct.description !== "" && newproduct.price !== "" && newproduct.category !== "" && newproduct.stock !== "" && newproduct.images.url !== "" && (
                            <button type="submit" className="btn btn-success" style={styles.button} onClick={handlecreatenewprod}>Create The Product</button>
                          )
                        }

                      </div>
                    </div>
                  </form>
                </div>
              )
            }

            {opt === "theproduct" && (
              <div style={style.editProductContainer}>
                <h1 style={style.editProductHeader}>Edit Product Details:</h1>
                <form onSubmit={handleSubmit}>
                  <div style={style.product}>
                    <img style={style.image} src={editedProduct[0].images[0].url} alt={editedProduct[0].name} />
                    <div style={style.details}>
                      <label htmlFor="name" style={style.label}>Product Name:</label>
                      <input type="text" name="name" value={editedProduct[0].name} onChange={(e) => handleChange(0, "name", e.target.value)} style={style.input} />
                      <label htmlFor="_id" style={style.label}>Product ID:</label>
                      <input type="text" name="_id" value={editedProduct[0]._id} disabled style={style.disabledInput} />
                      <label htmlFor="description" style={style.label}>Description:</label>
                      <textarea name="description" value={editedProduct[0].description} onChange={(e) => handleChange(0, "description", e.target.value)} style={style.textarea} />
                      <label htmlFor="price" style={style.label}>Price (in Rupees):</label>
                      <input type="number" name="price" value={editedProduct[0].price} onChange={(e) => handleChange(0, "price", e.target.value)} style={style.input} />
                      <label htmlFor="category" style={style.label}>Category:</label>
                      <input type="text" name="category" value={editedProduct[0].category} onChange={(e) => handleChange(0, "category", e.target.value)} style={style.input} />
                      <label htmlFor="stock" style={style.label}>Stock:</label>
                      <input type="number" name="stock" value={editedProduct[0].stock} onChange={(e) => handleChange(0, "stock", e.target.value)} style={style.input} />

                      <label htmlFor="url" style={style.label}>Image URL:</label>
                      <input type="text" name="url" value={editimageurl} onChange={(e) => handleeditimage(e)} style={style.input} />

                      <label htmlFor="user" style={style.label}>Created/Updated By:</label>
                      <input type="text" name="user" value={user._id} disabled style={style.disabledInput} />
                      <label htmlFor="createdAt" style={style.label}>Created On:</label>
                      <input type="text" name="createdAt" value={editedProduct[0].createdAt.slice(0, 10)} disabled style={style.disabledInput} />
                      <button type="submit" className="btn btn-success" style={styles.button}>Update Product Details</button>
                    </div>
                  </div>
                </form>
              </div>
            )}




            {
              opt === "customers" &&
              <div style={{ position: "relative", top: "80px", opacity: "0.9", backgroundColor: "#D2F1FE", height: windowWidth >= 692 ? '600px' : '1700px', alignItems: "center", justifyContent: "center", overflowY: "auto" }}>
                <ul style={styles.productList}>
                  {allUsers.map((user, index) => (
                    <li key={index} style={styles.product}>
                      <div style={styles.details}>
                        <h3 style={{ marginBottom: '10px', fontSize: windowWidth >= 692 ? '20px' : '40px', fontWeight: 'bold' }}>UserName: {user.username}</h3>
                        <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '35px' }}>UserID: <b>{user._id}</b></p>
                        <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '35px' }}>Email: {user.email}</p>
                        <p style={{ marginBottom: '5px', color: '#666', fontSize: windowWidth >= 692 ? '16px' : '35px' }}><b>Role: {user.work}</b></p>
                      </div>
                      <button type="button" className="btn btn-success" onClick={() => { changeroles(user.work, user.email) }} style={{ fontSize: windowWidth >= 692 ? null : '40px' }}>Switch Role</button>
                    </li>
                  ))}
                </ul>
              </div>
            }




          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Horizontal centering
          alignItems: 'center', // Vertical centering
          minHeight: windowWidth >= 692 ? '1000px' : '3000px', // Adjusted height based on window width
          minWidth: windowWidth >= 692 ? '1540px' : '1540px',
          height: "auto",
          width: "auto",
        }}>
          <h1 style={{ fontSize: "120px" }}><b>Access Denied!</b></h1>
        </div>



      )}
    </div>
  );
};

const styles = {
  grandTotalContainer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    width: "300px",
    fontSize: window.innerWidth >= 692 ? null : '25px'
  },
  grandTotalContainer3: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    width: "300px",
    position: "relative",
    left: "750px"
  },
  grandTotalContainer2: {
    marginTop: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    width: "300px",
    fontSize: window.innerWidth >= 692 ? null : '25px',
    whiteSpace: "nowrap"
  },
  hr2: {
    borderWidth: "2px",
    opacity: 0.6,
    width: "300px",
  },
  cartContainer: {
    maxWidth: '900px',
    width: '100%',
    padding: '30px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 20px 20px rgba(0, 0, 0, 0.1)',
  },
  product: {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: window.innerWidth >= 692 ? '120px' : '140px',
    height: window.innerWidth >= 692 ? '120px' : '140px',
    borderRadius: '10px',
    marginRight: '20px',
  },
  details: {
    flex: '1',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#5ABCE6',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    width: "21px",
  },
  quantityButton2: {
    backgroundColor: 'gray',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '20px',
    transition: 'background-color 0.3s',
    marginRight: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    width: "21px",
  },
  quantityText: {
    fontSize: '20px',
    color: '#333',
    margin: '0 5px',
    marginRight: "10px"
  },
  checkoutButton: {
    marginTop: '30px',
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  },
  grandTotal: {
    marginTop: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
  },

};

const style = {
  editProductContainer: {
    position: "relative",
    top: "80px",
    opacity: "0.9",
    backgroundColor: "#D2F1FE",
    height: window.innerWidth >= 692 ? '600px' : '1700px',
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
  editProductHeader: {
    position: "relative",
    top: "20px",
    left: "30px",
    fontSize: window.innerWidth >= 692 ? '35px' : '43px',
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "25px"
  },
  product: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
  },
  image: {
    width: "600px",
    height: "600px",
    marginRight: "20px",
    borderRadius: "10px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  label: {
    marginTop: "20px",
    color: "#666",
    fontSize: window.innerWidth >= 692 ? '21px' : '35px',
    textAlign: "center"
  },
  input: {
    marginBottom: "10px",
    padding: "10px 120px",
    fontSize: window.innerWidth >= 692 ? '16px' : '32px',
    borderRadius: "10px",
    border: "2px solid #ccc",
    textAlign: "center"
  },
  textarea: {
    marginBottom: "10px",
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "50px",
    textAlign: "center"
  },
  disabledInput: {
    marginBottom: "10px",
    padding: "8px",
    fontSize: window.innerWidth >= 692 ? '16px' : '32px',
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f3f3f3",
    color: "#666",
    textAlign: "center"
  },
  button: {
    marginTop: "20px",
    padding: "15px 20px",
    fontSize: window.innerWidth >= 692 ? '16px' : '40px',
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
};


// Inline CSS Styles
const dashboardStyle = {
  fontFamily: 'Arial, sans-serif',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  width: '100%',
  height: '100% auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const navStyle = {
  position: "relative",
  right: "870px",
  top: "100px",
  display: "flex"
};

const mainSectionStyle = {
  marginBottom: '40px',
};

const orderListStyle = {
  border: '1px solid #ccc',
  padding: '10px',
};

const footerStyle = {
  textAlign: 'center',
  marginTop: '40px',
};

export default Dashboard;
