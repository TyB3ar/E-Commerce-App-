import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Profile from "./components/Users";
import Login from "./firebase/Login";
import Register from "./firebase/Register";
import RequireAuth from "./components/RequireAuth";
import ProductsPage from "./components/ProductsPage";
import Checkout from "./cart/Checkout";
import OrderDetails from "./components/OrderDetails";
import MyOrders from "./components/MyOrders";
import { useAuth } from "./hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/fbConfig";

const Navbar = ({ user }: { user: any }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err: any) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      {user ? (
        <>
          <Link to="/"><button>Home</button></Link>
          <Link to="/products"><button>Products</button></Link>
          <Link to="/cart"><button>Cart</button></Link>
          <Link to="/profile"><button>Profile</button></Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </>
      )}
    </nav>
  );
};

const App = () => {
  const { user, loading } = useAuth();

  if(loading) return <p>Loading...</p>

  return (
    <Router>
      <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Navbar user={user} />
      </header>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/products" element={<RequireAuth><ProductsPage /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/orders/:orderId" element={<RequireAuth><OrderDetails /></RequireAuth>} />
          <Route path="/my-orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
