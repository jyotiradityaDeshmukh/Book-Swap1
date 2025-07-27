import { get, post } from "../api/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FiTrash2,
  FiShoppingBag,
  FiCreditCard,
  FiArrowLeft,
  FiPlus,
  FiMinus,
  FiDollarSign,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const user = localStorage.getItem("user");
  const [data, setdata] = useState([]);
  const [a, seta] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      get("getcart", {
        user: user,
      }).then((response) => {
        setdata(response.data);
        console.log(data);
      });
    }
  }, [a]);

  function remove_cart(name) {
    const user = localStorage.getItem("user");
    post("removecart", {
      name,
      user,
    }).then((result) => {
      console.log(result.data);
      console.log("removed from cart");
      toast.success("Removed from cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      seta(a + 1);
    });
  }

  var sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum = sum + data[i].Price;
  }

  function buyyed() {
    setLoading(true);
    const promises = data.map((arr) => {
      const name = arr.name;
      const price = arr.Price;
      const img = arr.img;
      const user = localStorage.getItem("user");
      return post("checkout", {
        user,
        name,
        img,
        price,
      });
    });

    Promise.all(promises).then((results) => {
      setLoading(false);
      toast.success("Successfully purchased all books!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      seta(a + 1);
    });
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Please Login First
            </h2>
            <p className="text-gray-600 mb-8">
              You need to be logged in to view your cart
            </p>
            <Link
              to="/login"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Login Now</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any books to your cart yet
            </p>
            <Link
              to="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <FiShoppingBag className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <div className="text-lg text-gray-600">
            {data.length} {data.length === 1 ? "item" : "items"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="card overflow-hidden group relative"
                >
                  {/* Book Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-60 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>

                  {/* Book Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Price and Actions */}
                    <div className="flex flex-col space-y-2 mt-2">
                      <div className="flex items-center text-lg font-bold text-blue-600">
                        <FiDollarSign className="h-4 w-4" />
                        {item.Price}
                      </div>

                      <button
                        onClick={() => remove_cart(item.name)}
                        className="w-full bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all duration-200 text-xs"
                      >
                        <FiTrash2 className="h-3 w-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Item List */}
              <div className="space-y-3 mb-6">
                {data.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">
                      {item.name}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${item.Price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${sum.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you ready to complete your purchase?")
                  ) {
                    buyyed();
                  }
                }}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiCreditCard className="h-5 w-5" />
                    <span>Proceed to Payment</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Secure checkout powered by BookSwap</p>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
        />
      </div>
    </div>
  );
};

export default Cart;
