import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-text">Stackly-Tool</span>
        </Link>
      </div>

      <nav className="header-center">
        <a href="#design" className="nav-link">Features</a>
        <a href="#product" className="nav-link">Templates</a>
        <a href="#plans" className="nav-link">Pricing</a>
        {/* <a href="#business" className="nav-link">Business</a>
        <a href="#education" className="nav-link">Education</a>
        <a href="#help" className="nav-link">Help</a> */}
      </nav>

      <div className="header-right">
        <div className="auth-combined">
          {/* <button onClick={() => navigate("/dashboard")} className="dashboard-btn">
            Dashboard
          </button>

          <span className="divider">|</span> */}

          <button onClick={() => navigate("/login")}>
            Signup 
          <span className="divider"> / </span> 
            Login
          </button>


          {/* <button onClick={() => navigate("/signup")}>
            Sign up
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
