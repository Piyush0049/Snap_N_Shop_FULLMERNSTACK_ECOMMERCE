import React, { useState } from 'react';
import backimage from './snapedit_1709804086088.jpeg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const SearchBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSearchInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    const [hoveri, setHoveri] = useState(false);

    const ButtonHoverStyle = {
        backgroundColor: '#7ED5F9',
        color: 'black',
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
        <div style={{ backgroundImage: `url(${backimage})`, backgroundSize: 'cover', minHeight: windowWidth >= 692 ? '1200px' : '3000px', height : "auto",
        width : "auto",// Adjusted height based on window width
        minWidth: windowWidth >= 692 ? '1540px' : '1540px', }}>
            <div style={styles.container}>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchInputChange}
                    placeholder="Search..."
                    style={styles.input}
                />
                <button
                    onClick={handleSearch}
                    style={{ ...styles.button, ...(hoveri ? ButtonHoverStyle : null) }}
                    onMouseEnter={() => setHoveri(true)}
                    onMouseLeave={() => setHoveri(false)}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '500px',
        margin: 'auto',
        position: 'relative',
        top: window.innerWidth >= 692 ? '350px' : '500px',
        right : window.innerWidth >= 692 ? null : '170px',
    },
    input: {
        flex: '1',
        padding: window.innerWidth >= 692 ? '12px' : '40px',
        fontSize: window.innerWidth >= 692 ? '18px' : '50px',
        border: '2px solid #ccc',
        borderRadius: window.innerWidth >= 692 ? '20px' : '40px',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: window.innerWidth >= 692 ? '12px' : '40px',
        fontSize: window.innerWidth >= 692 ? '18px' : '50px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: window.innerWidth >= 692 ? '20px' : '40px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s',
    },
};

export default SearchBar;
