import React, { useState } from 'react';
import backgroundImage from './snapedit_1710097319045.jpeg';
import { Link } from 'react-router-dom';
import { IconButton, makeStyles } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from './actions/useractions';
import { usersignup } from './actions/useractions';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    input: { display: 'none' },
    iconButton: { marginLeft: theme.spacing(1) },
    icon: { fontSize: 48 }
}));

const LoginPage = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setusername] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [login, setlogin] = useState("login");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const [showloginPassword, setShowloginPassword] = useState(true);
    const [showsignupPassword, setShowsignupPassword] = useState(true);
    const [showsignupcPassword, setShowsignupcPassword] = useState(true);
    const { isAuthenticated, user } = useSelector((state) => state.userdetails);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (login === "login") {
                await dispatch(userlogin(email, password));
                navigate("/")
            } else if (login === "signup") {
                if (password === cpassword) {
                    const myForm = new FormData();
                    myForm.set("username", username);
                    myForm.set("email", email);
                    myForm.set("password", password);
                    await dispatch(usersignup(myForm));
                    navigate("/");
                } else {
                    setPassword("");
                    setcpassword("");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    const [isHovered, setIsHovered] = useState(false);

    const toggleloginPasswordVisibility = () => {
        setShowloginPassword(!showloginPassword);
    };

    const togglesignupPasswordVisibility = () => {
        setShowsignupPassword(!showsignupPassword);
    };

    const togglesignupcPasswordVisibility = () => {
        setShowsignupcPassword(!showsignupcPassword);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: windowWidth >= 692 ? '1000px' : '3000px', // Adjusted height based on window width
            minWidth: windowWidth >= 692 ? '1540px' : '1540px',
            height : "auto",
            width : "auto",
            padding : "0",
            margin : "0"
        }}>
            {login === "login" ? (
                <>
                    <h2 style={styles.title1}>Welcome Back To <b>Snap & Shop</b>!</h2>
                    <h5 style={styles.title2}>Access all features by <b>logging</b> in to your account</h5>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ ...styles.input, width: '100%', padding: '15px' }}
                            required
                        />
                        <div style={{ display: "flex" }}>
                            <input
                                type={showloginPassword ? "password" : "text"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ ...styles.input, width: '100%', padding: '15px' }}
                                required
                            />
                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}
                                onClick={toggleloginPasswordVisibility}
                                className={classes.iconButton}>
                                {showloginPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </div>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                padding: '15px',
                                backgroundColor: isHovered ? 'green' : '#007bff'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            Login
                        </button>
                        <p style={{ marginTop: '10px', textAlign: 'center', fontSize:  windowWidth >= 692 ? '16px' : '40px', }}>
                            Do not have an account? <Link onClick={() => setlogin("signup")}>Sign up now!</Link>
                        </p>
                        <p style={{ textAlign: 'center',  fontSize: windowWidth >= 692 ? '16px' : '40px', }}>
                            Forgot Password? <Link to="/password/forgot">Set new password</Link>
                        </p>
                    </form>
                </>
            ) : (
                <>
                    <h2 style={styles.title1}>Welcome To <b>Snap & Shop</b>!</h2>
                    <h5 style={styles.title2}>Join now for seamless shopping on our <b>premium</b> platform!</h5>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            style={{ ...styles.input, width: '100%', padding: '15px' }}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ ...styles.input, width: '100%', padding: '15px' }}
                            required
                        />
                        <div style={{ display: "flex" }}>
                            <input
                                type={showsignupPassword ? "password" : "text"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ ...styles.input, width: '100%', padding: '15px' }}
                                required
                            />
                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}
                                onClick={togglesignupPasswordVisibility}
                                className={classes.iconButton}>
                                {showsignupPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </div>
                        <div style={{ display: "flex" }}>
                            <input
                                type={showsignupcPassword ? "password" : "text"}
                                placeholder="Confirm Password"
                                value={cpassword}
                                onChange={(e) => setcpassword(e.target.value)}
                                style={{ ...styles.input, width: '100%', padding: '15px' }}
                                required
                            />
                            <IconButton style={{ width: "40px", height: "40px", marginTop: "9px" }}
                                onClick={togglesignupcPasswordVisibility}
                                className={classes.iconButton}>
                                {showsignupcPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </div>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                padding: '15px',
                                backgroundColor: isHovered ? 'green' : '#007bff'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            Signup
                        </button>
                        <p style={{ allproducts: '10px', textAlign: 'center', fontSize: windowWidth >= 692 ? '16px' : '40px', }}>
                            Already have an account? <Link onClick={() => setlogin("login")}>Log in now!</Link>
                        </p>
                    </form>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    title1: {
        marginBottom: '20px',
        fontSize: window.innerWidth >= 692 ? '45px' : '100px',
        fontWeight: 'bold',
        color: '#333',
    },
    title2: {
        marginBottom: '40px',
        fontSize: window.innerWidth >= 692 ? '20px' : '60px',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        color: '#333',
    },
    form: {
        width: window.innerWidth >= 692 ? '400px' : '1000px',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
    },
    input: {
        padding: "10px",
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize:  window.innerWidth >= 692 ? '16px' : '55px',
        outline: 'none',
    },
    button: {
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        fontSize:  window.innerWidth >= 692 ? '16px' : '50px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '10px',
        fontWeight: 'bold',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
};

export default LoginPage;
