import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./Home";
import Otp from "./components/auth/Otp";
import LoginEmail from "./components/auth/LoginEmail";
import LoginPhone from "./components/auth/LoginPhone";
import SignupEmail from "./components/auth/SignupEmail";
import SignupPhone from "./components/auth/SignupPhone";
import Dashboard from "./components/dashboard/Dashboard";



function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup","/otp","/login-email","/signup-phone","/signup-email","/login-phone","/dashboard"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login-email" element={<LoginEmail />} />
        <Route path="/login-phone" element={<LoginPhone />} />
        <Route path="/signup-email" element={<SignupEmail />} />
        <Route path="/signup-phone" element={<SignupPhone />} />


        
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
