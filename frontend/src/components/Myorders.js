import React from 'react';
import { useSelector } from 'react-redux';
import backgrd from "./snapedit_1711285995245.jpeg";
import { useState } from 'react';
import { useEffect } from 'react';

const Myorders = () => {
    const { orderdet } = useSelector((state) => state.myorders);
    console.log("knsonono", orderdet)
    const { user } = useSelector((state) => state.userdetails);
    const a = localStorage.getItem("myorder");
    const userid = user._id;
    var filteredOrders = [];
    if(orderdet[0] !==null){
    filteredOrders = orderdet.filter((order) => (order.user === userid));
    }
    console.log("soospsjpp", filteredOrders)
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
    return (<>
            <div>
                {filteredOrders.length != 0 && orderdet[0] !==null ? filteredOrders.map((order) => (
                    <div key={order._id} style={{ position: 'relative', minHeight: '1450px' }}>
                        <div style={{
                            minHeight: windowWidth >= 692 ? '1600px' : '3000px', // Adjusted height based on window width
                            minWidth: windowWidth >= 692 ? '1540px' : '1540px',
                            height : "auto",
                            width : "auto",
                            backgroundColor : "#A7F7FE",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0,
                        }}>
                        <div style={styles.ordersContainer}>
                            <div style={styles.container}>
                                <h1 style={styles.header}><b>My Order Summary : </b></h1>
                                <div style={styles.grandTotalContainer3}>
                                    <div style={{ fontSize :  window.innerWidth >= 692 ? "20px" : '40px',}}>Placed On:</div>
                                    <div style={{ fontSize: window.innerWidth >= 692 ? "20px" : '40px' }}>{order.createdAt.toString().slice(0, 10)}</div>
                                </div>
                                <ul style={styles.productList}>
                                    {order.orderitems.map((p) => (
                                        <div key={p._id} style={styles.product}>
                                            <img style={styles.image} src={p.image} alt={p.name} />
                                            <div style={styles.details}>
                                                <h3 style={{ marginBottom: '10px', fontSize :  window.innerWidth >= 692 ? "20px" : '50px', fontWeight: 'bold' }}>{p.name}</h3>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize :  window.innerWidth >= 692 ? "20px" : '45px', }}>Price: ₹{p.price}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize :  window.innerWidth >= 692 ? "20px" : '45px', }}>Quantity: {p.quantity}</p>
                                                <p style={{ marginBottom: '5px', color: '#666', fontSize :  window.innerWidth >= 692 ? "20px" : '45px', }}>Total: ₹{p.price * p.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </ul>

                                <div style={{ display: "flex" }}>
                                    <div style={{ marginLeft: "70px" }}>
                                        <h2 style={{ marginBottom: "40px", fontSize : windowWidth >= 692 ? null : '50px', }}><b>Shipping Address : </b></h2>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Address :</div>
                                            <div>{order.shippinginfo.address}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>Country :</div>
                                            <div>{order.shippinginfo.country}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>State :</div>
                                            <div>{order.shippinginfo.state}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div>City :</div>
                                            <div>{order.shippinginfo.city}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer2}>
                                            <div><b>Order Status :</b></div>
                                            <div><b>{order.orderStatus}</b></div>
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: "450px" }}>
                                        <h2><b>Invoice Details : </b></h2>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Sub Total:</div>
                                            <div>₹{order.itemsPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>GST (18%):</div>
                                            <div>₹{order.taxPrice}</div>
                                        </div>
                                        <div style={styles.grandTotalContainer}>
                                            <div>Shipping Charges:</div>
                                            <div>₹{order.shippingPrice}</div>
                                        </div>
                                        <hr style={{ marginTop: '30px', borderWidth: "3px", borderColor: "black" }} />
                                        <div style={styles.grandTotalContainer}>
                                            <div>Grand Total:</div>
                                            <div>₹{order.totalPrice}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                )) : <div style={styles.noOrderMessage}><h1 style={styles.textMessage}><b>No orders to display!</b></h1></div> }
            </div>
        
            
                
                </>
    );
};

const styles = {
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    ordersContainer: {
        display: 'grid',
        gridGap: '20px',
        position: "relative",
        top: "50px",
        zIndex: 3,
    },
    orderCard: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
    },
    productList: {
        marginTop: '10px',
    },

    hr2: {
        borderWidth: "2px",
        opacity: 0.6,
        width: "300px",
    },
    container: {
        fontFamily: 'Arial, sans-serif',
        minWidth: '1300px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        position: "relative",
        top: "10px",
        minHeight: "1100px",
        width : "auto",
        height : "auto"
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        marginTop: "20px",
        fontSize :  window.innerWidth >= 692 ? null : '50px',
    },
    productList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    grandTotalContainer: {
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        width: "300px",
        fontSize :  window.innerWidth >= 692 ? null : '25px',
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
        fontSize :  window.innerWidth >= 692 ? null : '25px',
    },
    checkoutButton: {
        marginTop: '80px',
        padding: '15px 30px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'block',
        margin: '0 auto',
    },
    image: {
        width: window.innerWidth >= 692 ? "100px" : '150px',
        height: window.innerWidth >= 692 ? "100px" : '150px',
        borderRadius: '10px',
        marginRight: '20px',
    },
    details: {
        flex: '1',
    },
    product: {
        marginBottom: '30px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '5px 7px 14px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    noOrderMessage: {
        textAlign: 'center',
        fontSize: '45px',
        color: '#666',
        height: "800px",
        backgroundColor: "#A0E1FC",
    },
    textMessage: {
        position: "relative",
        top: "300px"
    }
};

export default Myorders;
