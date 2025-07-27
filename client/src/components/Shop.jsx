import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FiSearch,
  FiShoppingCart,
  FiCheck,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";
import data from "./data.json";
import { get, post } from "../api/api";

export default function Shop() {
  const [search, setsearch] = useState("");
  const [dataaa, setdataa] = useState([]); //duplicate data
  const [dataa, setdata] = useState([]);
  const user = localStorage.getItem("user");
  const [cartdata, secarttdata] = useState([]);
  const [buyed, setbuyed] = useState([]);
  const [a, seta] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setdata(data.data);
    setdataa(data.data);
    setLoading(false);
    console.log(dataa);
  }, []);

  function filtersearch(e) {
    e.preventDefault();
    const ndew = dataaa.filter((arr) => {
      const lowercase_name = String(arr.book_name).toLowerCase();
      let lowercase_search = search.toLocaleLowerCase();
      return lowercase_name.includes(lowercase_search);
    });
    setdata(ndew);
  }

  function add_cart(name, price, img) {
    const user = localStorage.getItem("user");
    const book_names = cartdata.map((arr) => arr.name);

    if (user) {
      if (book_names.includes(name)) {
        toast.warn("Already added to cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        post("addcart", {
          name,
          price,
          img,
          user,
        }).then((result) => {
          console.log(result.data);
          if (result.data === "success") {
            console.log("Added to cart");
            toast.success("Added to cart successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            seta(a + 1);
          }
        });
      }
    } else {
      toast.warn("Please login first!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      get("getcart", {
        user: user,
      }).then((response) => {
        secarttdata(response.data);
      });
    }
  }, [a]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      get("getbuyed", {
        user: user,
      }).then((response) => {
        setbuyed(response.data);
      });
    }
  }, [a]);

  var buyed_bname = buyed.map((arr) => arr.name);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-lg text-gray-600">
              Loading amazing books...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of books and find your perfect
            literary companion
          </p>
        </div>

        {/* Search Section */}
        <form onSubmit={filtersearch} className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dataa.map((book, index) => {
            const isOwned = buyed_bname.includes(book.book_name);
            const isInCart = cartdata.some(
              (item) => item.name === book.book_name
            );

            return (
              <div key={index} className="card overflow-hidden group relative">
                {/* Book Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.book_cover_image}
                    alt={book.book_name}
                    className="w-full h-60 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                  />
                  {isOwned && (
                    <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <FiCheck className="mr-1" />
                      Owned
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Book Info */}
                <div className="p-3">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                    {book.book_name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                    {book.book_description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="h-3 w-3 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">(4.5)</span>
                  </div>

                  {/* Price and Action */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center text-lg font-bold text-gray-900">
                      <FiDollarSign className="h-4 w-4" />
                      {book.book_price}
                    </div>

                    {isOwned ? (
                      <button
                        disabled
                        className="w-full bg-gray-200 text-gray-500 px-2 py-1.5 rounded-lg cursor-not-allowed flex items-center justify-center space-x-1 text-xs"
                      >
                        <FiCheck className="h-3 w-3" />
                        <span>Owned</span>
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          add_cart(
                            book.book_name,
                            book.book_price,
                            book.book_cover_image
                          )
                        }
                        className={`w-full ${
                          isInCart
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "btn-primary"
                        } px-2 py-1.5 rounded-lg flex items-center justify-center space-x-1 transition-all duration-200 text-xs`}
                      >
                        <FiShoppingCart className="h-3 w-3" />
                        <span>{isInCart ? "In Cart" : "Add"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {dataa.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
