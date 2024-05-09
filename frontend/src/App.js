import Headers from "./components/Headers";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Prodpage from "./components/Prodpage";
import Allproducts from "./components/Allproducts"
import Searchbar from "./components/Searchbar";
import LoginPage from "./components/Login";
import Account from "./components/Account";
import Getnewpassword from "./components/Getnewpassword";
import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { userdataaccess } from "./components/actions/useractions";
import React from "react";
import Forgotpassword from "./components/Forgotpassword";
import Mycart from "./components/Mycart";
import Shippingpage from "./components/Shippingpage";
import Payment from "./components/Payment"
import ConfirmOrder from "./components/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Success";
import Myorders from "./components/Myorders";
import Dashboard from "./components/Dashboard";
function App() {
  const dispatch = useDispatch();
  const [Stripeapikey, setstripeapikey] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.userdetails);

  const getsapikey = async () => {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setstripeapikey(data.stripeapikey);
    console.log(Stripeapikey + "zmozpnp")
  }
  useEffect(() => {
    console.log(JSON.stringify(user))
    getsapikey();
    if (isAuthenticated) {
      store.dispatch(userdataaccess());
      getsapikey();
    }
  }, [dispatch]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        console.log(windowWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
  return (
    <>
      <Router>
        <Headers />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<Prodpage />} />
              <Route path="/products" element={<Allproducts />} />
              <Route path="/products/:keyword" element={<Allproducts />} />
              <Route path="/search" element={<Searchbar />} />
              <Route path="/account" element={<Account />} />
              <Route path="/password/forgot" element={<Forgotpassword />} />
              <Route path="/mycart" element={<Mycart />} />
              <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
              <Route path="/shipping" element={<Shippingpage />} />
              <Route path="/confirmorder" element={<ConfirmOrder />} />
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route
                path="/payment"
                element={
                  Stripeapikey  && (
                    <Elements stripe={loadStripe(Stripeapikey)}>
                      <Payment />
                    </Elements>
                  )
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/myorders" element={<Myorders/>} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/Home" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<Prodpage />} />
              <Route path="/products" element={<Allproducts />} />
              <Route path="/products/:keyword" element={<Allproducts />} />
              <Route path="/search" element={<Searchbar />} />
              <Route path="/account" element={<LoginPage />} />
              <Route path="/password/forgot" element={<Forgotpassword />} />
              <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
              <Route path="/mycart" element={<LoginPage />} />
              <Route path="/shipping" element={<LoginPage />} />
              <Route path="/payment" element={<LoginPage />} />
              <Route path="/confirmorder" element={<LoginPage />} />
              <Route path="/myorders" element={<LoginPage/>} />
              <Route path="/dashboard" element={<Dashboard/>}/>
            </>
          )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;