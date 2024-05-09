import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import backimage from "./snapedit_1710779459498.jpeg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LocationSelector = () => {

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
  var shippingdet = "";
  const a = localStorage.getItem("shippingdetails");
  if (a !== "" || a !== null) {
    shippingdet = JSON.parse(a);
  }

  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(shippingdet !== null ? shippingdet.selectedCountry : null);
  const [selectedState, setSelectedState] = useState(shippingdet !== null ? shippingdet.selectedState : null);
  const [selectedCity, setSelectedCity] = useState(shippingdet !== null ? shippingdet.selectedCity : null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: shippingdet !== null ? shippingdet.userDetails.name : "",
    email: shippingdet !== null ? shippingdet.userDetails.email : "",
    address: shippingdet !== null ? shippingdet.userDetails.address : "",
    phone: shippingdet !== null ? shippingdet.userDetails.phone : "",
  });
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0); // or document.documentElement.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const countryOptions = allCountries.map(country => ({
      value: country.isoCode,
      label: country.name,
      phonecode: country.phonecode
    }));
    setCountries(countryOptions);
  }, []);

  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);
    // Fetch states of the selected country
    const countryStates = State.getStatesOfCountry(selectedOption.value);
    const stateOptions = countryStates.map(state => ({
      value: state.isoCode,
      label: state.name
    }));
    setStates(stateOptions);
    // Reset selected state and city
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = selectedOption => {
    setSelectedState(selectedOption);
    // Fetch cities of the selected state
    const stateCities = City.getCitiesOfState(selectedCountry.value, selectedOption.value);
    const cityOptions = stateCities.map(city => ({
      value: city,
      label: city.name
    }));
    setCities(cityOptions);
    // Reset selected city
    setSelectedCity(null);
  };

  const handleCityChange = selectedOption => {
    setSelectedCity(selectedOption);
  };

  const handleInputChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const styles = {

    hr2: {
      borderWidth: "2px",
      opacity: 0.6,
      width: "300px",
    },
    container: {
      maxWidth: '1100px',
      maxHeight : windowWidth >= 692 ? '2000px' : '3000px',
      height : "auto",
      width : "auto",
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      position: "relative",
      top: "1px",
    },
    userDetailsContainer: {
      marginTop: '20px',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    label: {
      marginBottom: '5px',
      fontSize: windowWidth >= 692 ? "19px" : '50px',
    },
    input: {
      marginBottom: '10px',
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
      height : windowWidth >= 692 ? null : '65px',
      fontSize : windowWidth >= 692 ? null : '45px',
    },
    selectContainer: {
      marginBottom: '20px',
      fontSize : windowWidth >= 692 ? null : '45px',

    },
    proceedButton: {
      marginTop: '30px',
      padding: '15px 30px',
      fontSize: windowWidth >= 692 ? "18px" : '45px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',

    },
  };

  const shippingdetails = { userDetails, selectedCity, selectedState, selectedCountry };

  const handleproceedtocheckout = () => {
    localStorage.setItem('shippingdetails', JSON.stringify(shippingdetails));
    navigate("/confirmorder");

  }

  console.log(userDetails.phone)
  return (
    <div style={{
      backgroundImage: `url(${backimage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: windowWidth >= 692 ? '1000px' : '3000px', // Adjusted height based on window width
      minWidth: windowWidth >= 692 ? '1540px' : '1540px',
      height: "auto",
      width: "auto", paddingTop : windowWidth >= 692 ? "90px" : null
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: windowWidth >= 692 ? null : '150px', paddingBottom: windowWidth >= 692 ? null : '50px', }}>
        <Link to="/mycart" style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "red", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: windowWidth >= 692 ? '25px' : '35px', color: "red", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>

      <div style={styles.container}>
        <h2 style={{ marginBottom: "35px", textAlign: "center", fontSize : windowWidth >= 692 ? null : '70px',}}><b>Add Shipping Details : </b></h2>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Phone:</label>
          <input
            type="Number"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.selectContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Country:</label>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countries}
          />
        </div>
        {selectedCountry !== null && (
          <div style={styles.selectContainer}>
            <label style={styles.label}>State:</label>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              isDisabled={!selectedCountry}
            />
          </div>
        )}
        {selectedState !== null && (
          <div style={styles.selectContainer}>
            <label style={styles.label}>City:</label>
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities}
              isDisabled={!selectedState}
            />
          </div>
        )}
        {selectedCountry !== null && selectedState !== null && selectedCity !== null && userDetails.name !== null && userDetails.phone !== null && userDetails.address !== null && userDetails.email !== null && (
          <>

            <div style={{ textAlign: 'center' }}>
              <h5 style={{ fontFamily: "revert", marginTop: "20px", fontSize : windowWidth >= 692 ? null : '55px', }}><b>Please check the details before submitting.</b></h5>
              <button style={styles.proceedButton} onClick={() => handleproceedtocheckout()} >Proceed To Checkout</button>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default LocationSelector;
