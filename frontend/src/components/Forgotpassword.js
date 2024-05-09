import React, { useState } from 'react';
import backgroundImage from './snapedit_1710097319045.jpeg';
import { useDispatch } from 'react-redux';
import { forgotuserpassword } from './actions/useractions';
import { useEffect } from 'react';
const Forgotpassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotuserpassword(email));
        setMessage(`Password reset link sent to ${email}`);

    };
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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: windowWidth >= 692 ? '1000px' : '3000px', 
            minWidth: windowWidth >= 692 ? '1540px' : '1540px',
            height : "auto",
            width : "auto",
            flexDirection: 'column',
            backgroundImage: `url(${backgroundImage}`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <h2 style={{ marginBottom: '20px', fontSize: windowWidth >= 692 ? '40px' : '100px', fontFamily : "sans-serif" }}><b>Forgot Your Password?</b></h2>
            <form onSubmit={handleSubmit} style={{ width: '400px', textAlign: 'center' }}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                        width: '100%',
                        padding:  windowWidth >= 692 ? '10px' : '30px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign : "center",
                        fontSize : windowWidth >= 692 ? '18px' : '35px',
                    }}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop : "10px",
                        fontSize : windowWidth >= 692 ? '18px' : '35px',
                    }}
                >
                    Send Reset Link
                </button>
            </form>
            {message && <p style={{ marginTop: '20px', fontSize : "20px" }}><b>{message}</b></p>}
        </div>
    );
};

export default Forgotpassword;


