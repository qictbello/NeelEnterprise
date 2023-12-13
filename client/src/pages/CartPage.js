import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("braintree");
  const [gcashReference, setGcashReference] = useState("");
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle Gcash payment
  const handlePaymentGcash = async () => {
    try {
      if (!gcashReference) {
        toast.error("Gcash reference is required.");
        return;
      }

      setLoading(true);

      // Send the Gcash reference and other necessary details to your backend
      const { data } = await axios.post("/api/v1/product/gcash/payment", {
        referenceNumber: gcashReference,
        cart,
      });

      setLoading(false);

      if (data.success) {
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ");
      } else {
        toast.error("Payment Failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Render payment section based on the selected payment method
  const renderPaymentSection = () => {
    switch (selectedPayment) {
      case "braintree":
        return (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={loading || !instance || !auth?.user?.address}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </button>
          </>
        );
      case "gcash":
        return (
          <div className="gcash-payment">
            <img
              src="/images/qrcode.png"
              alt="Gcash QR Code"
              width="200px"
              height="200px"
            />
            <p>Please scan the QR code and send the total amount to complete the payment.</p>
            <div className="gcash-confirm">
              <label>Gcash Reference:</label>
              <input
                type="text"
                value={gcashReference}
                onChange={(e) => setGcashReference(e.target.value)}
              /><br />
              <button
                className="btn btn-primary"
                onClick={handlePaymentGcash}
                disabled={!gcashReference || loading || !auth?.user?.address}
              >
                {loading ? "Processing ...." : "Confirm Gcash Payment"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>

              {/* Add a dropdown menu for payment options */}
              <div className="payment-dropdown">
                <label>Select Payment Method:</label>
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                >
                  <option value="braintree">Credit Card</option>
                  <option value="gcash">Gcash</option>
                </select>
              </div>

              {/* Render payment section based on the selected payment method */}
              {renderPaymentSection()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
