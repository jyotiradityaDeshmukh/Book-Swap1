import { Route, Routes } from "react-router-dom";
import Navbarr from "./components/Navbar";
import Mybooks from "./components/Mybooks";
import Cart from "./components/Cart";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbarr />
      <Routes>
        <Route path="/" element={<Shop />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Mybooks" element={<Mybooks />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}
