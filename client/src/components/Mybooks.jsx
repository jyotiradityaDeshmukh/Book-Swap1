import { get, post } from "../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FiChevronLeft,
  FiChevronRight,
  FiBook,
  FiUsers,
  FiRefreshCcw,
  FiCheck,
  FiX,
  FiSend,
  FiBookOpen,
  FiArrowLeft,
  FiArrowRight,
  FiDollarSign,
} from "react-icons/fi";

const Mybooks = () => {
  const user = localStorage.getItem("user");
  const [data, setdata] = useState([]);
  const [a, seta] = useState(0);
  const [book_page, setbook_page] = useState(0);
  const book = [
    "data:image/jpeg;base64,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",
    "https://scrappystickyinkymess.files.wordpress.com/2013/08/plainaiw.jpg",
    "https://www.wavepoetry.com/cdn/shop/files/Sampleinterior_Page_2.jpg?v=1693941573",
    "https://qph.fs.quoracdn.net/main-qimg-71292231364947f61ec134a689e66d5f",
    "https://pyxis.nymag.com/v1/imgs/302/6f5/c6dd99660e92c920fbe81572970d30c8b9-16-younger-novel.w710.jpg",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUXFxgbFxgYFxcXFxcXGhoYFxgYFx0YHSggGholHRcXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBQQGB//EAEUQAAEDAgIGBgUICAYDAAAAAAEAAhEDITFBBAUSUWFxIoGRobHwBhNyssEjJDIzgtHh8RQWNENSosLSU2JzkpPiFUJU/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKhEBAQACAgICAQMCBwAAAAAAAAECEQMxEiEEQYETIjIzkRQjUWFxwfD/2gAMAwEAAhEDEQA/APVlqJoEKwMsUThPUm9PYaYwVyilC8wJQOy67rLjqnJMqVL3zKB5vxUVvhNDY2wRBVSwj8kZH3qCpNNpEJjWnFSE5jUhlQQmA5IWtumAXCbOiaEJHamoSEkbQK1QRQgqpxUDbIiFRugKi0oSEwBLCBAuKHmmRmlvKSooqKpUSM2mM8FfBWcIVsGC6Uq2QEmrUyR1XZBJdjvSq8Z9k1BcFJabzxTq/Df5+KWwX3KW86OoN45pgGKTTxI6xxy+5Pi3nqSRl2trZROGSKm2ArCTPZcJoEIC3BFTQVELpgCpgzRFJFC1iKFZUQSFAEblRQRbiqCtoVSktSS45JjnZJBN0qqRblEBP5qKVOgunzmo11kpwRTZdRaELhcwJnz53p4OQSRj1qavEBJ7FezYxirHntV1D+HMpL2AEB3IefinC8FKayMAmxIvglSyPBRNQQrCGNi3GyoIXKA3SPR7Uw4JQR7VkmdiEqNCsKiUEslCSqc5L2kjkESgcUHrEO2ltpMV1HJTiqJugdiptXIjn5KIQCokp2Rx5IWNVuUqGBbOy62cLa5U04yhcPJV0wpaaA0kk5fcrVxfdZE0JHs+k2yjR2o4t1IJh070qy7WFYVwrdgkQA5KeYvuRuVBkqaqDD7I6RSW4BMYYQmw0vQvKU45pTnpbExGXoXVEipUVbaW2kwNe60qmuS5nkrSPQmhA/ciJS3FFERxVIHFRTtcjQ2VVRMAm3Wl1WrsYSlRJQtJkprm8UBbfrU1pKAg+exGxUBfwTGBIWnMqIMTB4R1qUbzKqoYMhRajXs1DVdIIQl9lEtjSqYkymTdRgQlIu0GKj7JVQQQfN0dQSg9BLrJTjZMdhCDYSq453PG9U03V1aaXUyhRWsmztvcptZSub1iAvEybHxS2fg7Z88EBq84XM+pgicRkjZeBm0JhRAKgwVIGmu510OUIjihqG4HWu1zQtzjkqc68SmVhCX6u05pVc0IHOPOCZTCWG5o9rNKipUOyeEIKpB8+eKtcQkOvhKyyVjjt3UyCjC5g6MLJ1MypTlDiZ+KUSgBVEplIuobKMdaUsiY4KhW6UdfnuQvQnTtXKJwtjdUTmoakhIgbMgpFVnBdEpe0ecJVctINGAuV1Ic4Xe4jCb4pFTeosaY5VzBkuklMNrqtkAKNdKldoqYzKtE0qJ6Ra19vegJzzVuVOK7nLEGF1IVCT1YI2nHzuQZcxgllyNmjmpUa3aLZJwvhJ+C6nejU/v3/wC1qi0suSY9uLajFBUEhd36sA416nYz7lP1XH+PV/k/tUUpz4OAGyjHHDzCRrvRDRcxjXucCCZdE48BgunV2qXVae360tJJwaDYcyo00vJj4+X0Nrgqe7NI1nojqBYNvb25kkQbRuPFCSXljQY2iBPNAllnlHQ51kuqdnpbl1/q/U2pGkCNxpfHbWFW0hzmuBtskiRnFk6OPPHLpqGpxQuqgXJXSfR0QIrVf5d3spZ9Ghj66t2s/tRpH6+BYdxsoDmnD0aFvlq3az+1cWlUyyq6ntFwaG3MbVxnEBLSsOXHK6htiUuCTGSIDJXN0tNSKlPfYqmthXUz5jqVEqdNPpW2olT54qJH4t4AWnK6qLKb1HCQu1xJTCvZ/FDTKIIMWj1AHB4uRh1z966q+uIFmjtXDC59IFlNg8ccu3rGmyxKmuXNqvZDYabYzlxWzTwHILyukgfpFXmPAKJHNwyXL2bp9QVi15EENgblpai+qEb3eKxqjokLZ1ET6ls7z7xS17bc81h6ZXpgenR5P/pXBolqtIf52+IXd6WH5Sjyd8FxaO75ajxe1Te2nF/S/u9mvBSCH83eK94vnrT0X8S7xKMmXxZ7r31E9ELEq65qCrUZDSGmBbgDvW1o/wBEcvgvH6ZV+c1hucPAeepO1Hx8ZllZW2NcO/hb2fis3SHhzzUIG2YwwsISWvERiuf1pxS7d+HDjPcjoq1olKLyd/4IKd7mxV1ZPnxQ18ZBbc8PAoDXmQERdAwlLDoxw8wpsEi3uwHaolVN8XUS0uYvREqyVRbZRrbQut5wibQgDrXxQNBJ3270YMjBCtI0nPsSdIZbJNCVpJseSKceopfRHIeC8rpX7TV5jwC9TR+i3kPBeX0wfOavMe6Fli5eH+VBWFp5rb1F9SzkfErDq/Bbuo/qGdfvFFbfI/hP+XB6QajfpFSm9tUMDGkQWl0kkGfpCFz6N6PVW1GPNZjg1wJGwRIGMdIrU0/Wop1BTLSZEzPEiO5CzWzS9rA0y7jhmlWOP6kx9dNJfPWHou3yV9BXgWNOw7PFKtPi/b3NA9FvV4LA0v0VY+q+t62qHPMkAtAFgIEt4Lb0Y9FvIeCxNL1/UZWfT2WENI2ZBk2ByPFNnxY55ZWYduXSdRijTfUFWoS1hMOLCLZWbKyKVUmDviVtaTrp1Rr6bmt2XCCRM3xzWWA1uFgk9Pgwzxl817YGSjRNzj5wQF8GZsfgjY4kT5hJvYLbQbeQuUOyTujtKhEecUFqBqVjgIVrnAyOfJRJpqR68FTNADFvP5Kib+e5dLydGBQABDtblQPUmNCaMUnTB0SmpWkMlpCVOPS6P9BvsjwC8rpx+dVOr3Wr1OjfQb7I8AvMawb86f8AZ8As8e3Pw/zqqhGK3NTD5FnL4lYtcdHqW3qf6mny+JTyjTnv7YwPSWoBpDM+gI7XJWrqgOk0+vwKL0m/aW/6Y94perGfOaR4u91yjTXCT9L8PYOXz6g8mm4r6A/A8l81ovLaZIwg5o0j4mO/L8f9voWjHot9keC8lrEj9JqjG490L1ehnoN9lvgF5vWXo5VfXqVRXDQ4iG+rnZgARO1fCU2fBnMM7az32KUOPb3rR/Vat/8ASP8Ai/7rM06k+lVdSc7agAlwETInCTCT0+LnwzvjKbTbjPUjLj+HOElrspQPrx24hJt4206o8CZI+JSXVIMY5BA121zy5C6N7MQTc78kaPUjna69x+SpFTEm7sPjx6lEtLtj173IQYBULVIuuh5ESjjKIjpKNdF/O5W8Jj7BUd2K2vBEHcl6QBskncupmpKTmtJ27tGD3DEKbdJyzmLQpaewNAnAALL0lrXVXVA7GIHIQmHUFL+Kp/vKH9Xqf+JVH2/vCmZSMccsJdlVIFjgu/QtNYxjWXsIlYms6Rp1NgOcRsg9KJm+4Lr0TUbX02uNSqC4AkAtAvzanbGmdxuMtK1pT9ZW9YDYNAjtPxSdEe1lZtR02m3MELp1hqv1NMuY+oYgkOINpvFgsysNvZBMSWi3E38UtbbceWNw1OnpDrikQYnA5fivIigAwtdecYnH4r0J9GqYkh9WfaEeC840kskm90RXxrx+/Dbdo+kbWtDdmSAB9LcBfBGPSVp/d/zceS5tA9HaD6bHu29pzQTDyLkAlMd6J6Nvq/8AIVLO5fHl943/AN+XUPSAf4f83/VYOs6oq1DUiJAETOFlo1PRdn7utUYcpIeDzBAPesbTKVSi/Yqi5wcMHDeJ8ENvj3h8v2TVKIgwL9SWW7gTPmy6Q0kiLcNyY2hAvIgWieKNO/zkcEgkAjJM2xkTN79W9SpoxBmM8eCBjSLDCyS/V6Exm0Sbl2WVlac6sG3iIEWAJKiPTO3K9R6IOV0wkuqBMpwtnmWH8FTUIKMISTpp6HUtyj9FvIeCw9NHRK3GYDkPBRmx5eozKusXiu9kDZbHeJTxpx3LK0l4/San2fALqbdVJNLxxx1PRentDiXkXiOoLV1Z9Uz2QszSMCtHVh+SZ7ISy6Ry/wAYdpVMOa5p/wDYEdq8bTN2NzbUAPU5ek1dpxfV0mm791UaG+w6mxwJ+0XjqXn9cs2NJws97HDtE98qcRwXW49jVwK+ft+qwy896+gPK8BTcTTNkYtfiff4ex1SPkaX+mz3QsjW+tqtOv6tpGzstMReTMrX1WfkaXsM90Lzuvz85PsNSnZcEl5buNLUutDUe9jokAEEWtgR4dqP0ooB1Gc2OaQeZiOVx2LL9GWj17xn6vxIW1r79nf9n3gj7Pkkx5p4/wCzzFFhNzPA4LvqCQJiNyXorZ3cOpNd0jF1pp23LdcT2md4yQVAG2OfmF2Cn0iSjrUm2MJaV+ozNiLYHed6i6NJo8bSopsbTKWNAMsm0nZIGmPuRt3q44Ke0omuK5vWdyaHWTRYXpz7EL0QwXmtKNrr0ijNhzfTB0n0fqGtUqtrgbZBDTTnZgAY7QnDvV/+Pq0mue6o14AmNgjv2iu1usxtuYW/RMTOKvSdID2OaJEiJ5pTyLHzZorbTJ3ha+qz8jT9lZXqdlsZXWrqw/JM5Ks+hzdMjRXbGsKu6o1o5ua0Ed20kem9OBRq7qrGnk4iO8d6vWdXZ0guzaWnqgT3LU1/oXr9HexsEnZc2bdJrg9t+Y71N9aqb+3Vabs14Vn1ZnivcuXhXfQd+CMG3xfv8PXat+qp+wz3QvP66b85cf8AI1eg1YD6qn7DPdCw9b/tJ9lqMey4P6lD6O0z+kPJ/g/qC2defUP6veCy/R5/y7/Y+IWtrr6l3V4hF/kfLf8AN/sxaDLBGGkCefnwRUnWhQ428Vo6ZVBoxO5KfTMjd4bvin4GSrOKBvTg0homfvUV6ay9u1RRXRh7nbr2Nk36uKKJE5Lpqs2vgdyS6iW43HcnHHM9hk23Ih55qNCs/mqGyNMMtHMda9M4ry9cRs+0B3r08rPNz8/085t/LVfaK6w6cFwv1LpXrajw+lD3uLQdqQCbT0cYTW6v0sZ0T9p4/oVTKHM8dG1TYg23Dh+crT1YfkmcliaTWMuY5o6OOYwyWzqc/Is5fFLPoubqVkae0GvUnMD3QtXU9SaTd7Zafs4d0LJ1i75w8cG+C6dRv2alRmRhw8D/AEos/aeWO+OVtFeEEbDt117teDI6Dt5JSxV8X7ey1b9VT9hvuhYGuI/STj9Fvgt/V/1VP2G+6Fj601BVqV3VW1mtaQ0BpYTEC5naHglLqs+POY520Po+QK7xadjwIWtrk/Iu6vEJGptU+p2nPeHudaQNkAbsSq9IavQDBi44cBfxhPvI7fPk9M+nFj2J4bZc1MEhOYb9y0ddhj22xSBiQnOfZJIN/PnJFGJRItE3UV0bC5nxUUr3pqtKovOAVSiba6HCVVog4W+PNJiJC7BdC9k5Jrmf1XI9oMThM9YutM6wG4rhdSIQNRZKq445dtM6xbuKr/yTdx7lli/Z58VQG9LxhfpYLq0gaj3zZx7F2aDpbWU2suYtbmuKb+HxVVGXsnpVwxs1R12B1V1TIxbOwj4K6Tw2oH7u8G0edyWTfz3JTjBhNcwmtNh2tWjIrzooNAcDeZTi4XS9km/Uo6Xx8eOHTW0bWgaxrdnAAY4wOXBOGuG/wntWA+xnzdT1xwym55fkl6H+GwvvTcOuBcBptv7cFl6RU2qhcSSYEzkMYHBJZpADrTH4IqLZJ8TjvTmlY8WOHuQ9kwCowZHFEJF4QVX3EY4fkqLtbnmccr8OKW57t+dvgpSb0o4XU2ZsMAT58ElakIrvdE2HHPmVFT2gnhF81altLJGyHKF1kkOVsKbzdOimd6Jpm6Q18kJ7TCpNi3BBUo2taAmB35IiUylsZ9Ruyefn71ZGC7nAZrnOjibWQ0me+yWNvfIK6gvbJO9SeC5w1xxHJCpd+wB484LngySZ82XVRoWuecK/VgYT53pNJlISKNpKjijqGcMAgcPPFI5f9XM5kjguaqzMYLreb2XO7cB53qW+NIxHkIxXjNVskZfFJZSvEob6laja5IFsTHVxQ0K4Jc7snzhZcvrCejyvuR0x0R+c8CntjcJIeyqTJsqcd+ff5ulUio4GDH5JDU2t7pJjDxUUbPXwVoN3sOSvgksemR4pxw02m26cHrnaUbVSLHQ033ItuQlBE0hNOjihVB0ngo4oStzkGGdkRS3mUKgHTlCQceXin1KnDrXNUSrbFLDhMpLnIi6bZoXuFgFLXGEsdF/Oa56b7nmc8in1RbvSQy85JN8dEuJnG+XJWy2+SidSk8k3ZQ0uRFN1+fwXUKthBwx8lIZSHEflimtCE5apjbCetW134ckuo2OUd6tg3nAZITob3Tgoo4QJ8VEFF0809pUURHLkMYJlPBUorRejWHwTWhRRNnVtzVszUUQQahQVFFEKxC8W6lz1MCoolWuAKrRItv8APclNFlFEq1nRDRYKy23YoopbFtN+so6mHUrUQq9l0jOO/wC5MoC08VFEDIVEyTPFE8KKJxF7KquOyFFFEq0x6f/Z",
  ];
  const [open_book, setopen_book] = useState(false);
  const [display_user, setdisplay_user] = useState(false);
  const [swap_book, setswapbook] = useState("");
  const [email2, setemail2] = useState("");
  const [swap_reqs, setswap_reqs] = useState([]);
  const [display_acceptswap, setdisplay_acceptswap] = useState(false);
  const [swap_book2, setswap_book2] = useState("");
  const [userr, setuser] = useState([]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    get("getbuyed", {
      user: user,
    }).then((response) => {
      setdata(response.data);
    });
  }, [a]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    get("getswapreq", {
      user: user,
    }).then((response) => {
      setswap_reqs(response.data);
      console.log("Swap Requests", swap_reqs);
    });
  }, [a]);

  useEffect(() => {
    get("getuser").then((response) => {
      setuser(response.data);
      console.log("user", userr);
    });
  }, [a]);

  function handleleft() {
    if (book_page > 0) {
      setbook_page(() => book_page - 1);
    } else {
      setbook_page(0);
    }
  }

  function handleright() {
    if (book_page < book.length - 1) {
      setbook_page(() => book_page + 1);
    } else {
      setbook_page(book.length - 1);
    }
  }

  function handle_generateswap() {
    post("generateswap", {
      user,
      email2,
      swap_book,
    }).then((result) => {
      console.log(result.data);
      if (result.data === "success") {
        console.log("Added to cart");
        toast.success("Swap request send", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        seta(a + 1);
      } else if (result.data == "already") {
        toast.warn("Already has the book ", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        seta(a + 1);
      } else if (result.data == "already_sent") {
        toast.warn("Already Swap req sent :) ", {
          position: "bottom-center",
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
  function accept_swap_fuc() {
    if (swap_book == swap_book2) {
      return toast.warn("Both book cant be same", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    post("acceptswapfuc", {
      user,
      email2,
      swap_book,
      swap_book2,
    }).then((result) => {
      console.log(result.data);
      if (result.data === "success") {
        console.log("Added to cart");
        toast.success("Books are swapped", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        seta(a + 1);
      } else if (result.data == "already") {
        toast.warn("Sender might have buyed book after sending req", {
          position: "bottom-center",
          autoClose: 5000,
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

  const book_list = data.map((arr) => arr.name);

  if (user) {
    if (data.length == 0) {
      return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-2xl mx-auto text-center px-4 py-20">
            <div className="glass-effect p-12 rounded-2xl">
              <FiBookOpen className="mx-auto text-6xl text-gray-400 mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No Books Yet
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Your personal library is empty. Start building your collection
                today!
              </p>
              <Link to="/">
                <button className="btn-primary flex items-center space-x-2 mx-auto">
                  <FiBook className="text-lg" />
                  <span>Browse Books</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Book Reader Modal */}
        {open_book && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="glass-effect w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
                <h3 className="text-white text-xl font-semibold flex items-center space-x-2">
                  <FiBookOpen />
                  <span>Reading Mode</span>
                </h3>
                <button
                  onClick={() => {
                    setopen_book(false);
                    setbook_page(0);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FiX />
                  <span>Close</span>
                </button>
              </div>

              {/* Book Content */}
              <div className="h-full bg-white flex items-center justify-center relative">
                <img
                  src={book[book_page]}
                  alt="Book page"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Navigation */}
              <div className="bg-gray-800 p-4 flex justify-center items-center space-x-4">
                <button
                  onClick={handleleft}
                  className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors"
                  disabled={book_page === 0}
                >
                  <FiArrowLeft className="text-xl" />
                </button>
                <span className="text-white font-medium">
                  {book_page + 1} / {book.length}
                </span>
                <button
                  onClick={handleright}
                  className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors"
                  disabled={book_page === book.length - 1}
                >
                  <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Selection Modal */}
        {display_user && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="glass-effect bg-white p-8 rounded-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Select User
                </h3>
                <button
                  onClick={() => setdisplay_user(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose who to swap with:
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email2}
                  onChange={(e) => setemail2(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {userr.map((arr) =>
                    arr.email != user ? (
                      <option key={arr.email} value={arr.email}>
                        {arr.email}
                      </option>
                    ) : null
                  )}
                </select>
              </div>

              <button
                onClick={() => {
                  setdisplay_user(false);
                  handle_generateswap();
                  seta(a + 1);
                }}
                disabled={!email2}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend />
                <span>Send Swap Request</span>
              </button>
            </div>
          </div>
        )}

        {/* Accept Swap Modal */}
        {display_acceptswap && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="glass-effect bg-white p-8 rounded-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Accept Swap
                </h3>
                <button
                  onClick={() => setdisplay_acceptswap(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your book to swap:
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={swap_book2}
                  onChange={(e) => setswap_book2(e.target.value)}
                >
                  <option value="">Select a book...</option>
                  {book_list.map((arr) => (
                    <option key={arr} value={arr}>
                      {arr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setdisplay_acceptswap(false);
                  accept_swap_fuc();
                }}
                disabled={!swap_book2}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheck />
                <span>Accept Swap</span>
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              My Library
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your book collection and swap requests
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Books Collection */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 mb-6">
                <FiBook className="text-blue-600" />
                <span>Your Books ({data.length})</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data.map((arr, index) => (
                  <div
                    key={index}
                    className="card overflow-hidden group relative"
                  >
                    {/* Book Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={arr.img}
                        alt={arr.name}
                        className="w-full h-60 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>

                    {/* Book Info */}
                    <div className="p-3">
                      <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                        {arr.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center text-lg font-bold text-green-600 mb-2">
                        <FiDollarSign className="h-4 w-4" />
                        {arr.Price}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => setopen_book(true)}
                          className="w-full btn-primary flex items-center justify-center space-x-1 text-xs"
                        >
                          <FiBookOpen className="h-3 w-3" />
                          <span>Read</span>
                        </button>
                        <button
                          onClick={() => {
                            setdisplay_user(true);
                            seta(a + 1);
                            setswapbook(() => arr.name);
                          }}
                          className="w-full btn-secondary flex items-center justify-center space-x-1 text-xs"
                        >
                          <FiRefreshCcw className="h-3 w-3" />
                          <span>Swap</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swap Requests Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <FiUsers className="text-blue-600" />
                    <span>Swap Requests</span>
                  </h2>

                  {swap_reqs.length > 0 ? (
                    <div className="space-y-4">
                      {swap_reqs.map((arr, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {arr.book_name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                From: {arr.email1}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setdisplay_acceptswap(true);
                              setswapbook(arr.book_name);
                              setemail2(arr.email1);
                            }}
                            className="w-full btn-primary flex items-center justify-center space-x-2 text-sm"
                          >
                            <FiCheck />
                            <span>Accept Request</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiUsers className="mx-auto text-4xl text-gray-400 mb-4" />
                      <p className="text-gray-600">No swap requests yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
        />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto text-center px-4 py-20">
          <div className="glass-effect p-12 rounded-2xl">
            <FiUsers className="mx-auto text-6xl text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Not Logged In
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Please log in to access your personal library and manage your
              books.
            </p>
            <Link to="/login">
              <button className="btn-primary flex items-center space-x-2 mx-auto">
                <FiUsers className="text-lg" />
                <span>Login to Continue</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Mybooks;
