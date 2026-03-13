import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Mail, Phone } from "lucide-react";

import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <h2>Sign in or create an account in seconds</h2>

      <p className="auth-subtitle">
        Select a sign-in method to continue. You'll be ready to create and explore in just a few seconds.
      </p>

      {/* Phone Primary */}
      <button
        className="auth-button primary"
        onClick={() => navigate("/login-phone")}
      >
        <Phone size={16} />
        <span>Continue with phone number </span>
      </button>

      {/* Email Secondary */}
      <button
        className="auth-button secondary"
        onClick={() => navigate("/login-email")}
      >
        <Mail size={16} />
        <span>Continue with email</span>
      </button>

      {/* Google */}
      <button className="auth-button secondary google-btn">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
        />
        <span>Continue with Google</span>
      </button>

      <p className="auth-terms">
        By continuing, you agree to receive updates from the &lt;App Name&gt; 
        team and confirm that you have read, understood, and agree to 
        &lt;App Name&gt;’s{" "}
        <a href="/terms">Terms & Conditions</a>,{" "}
        <a href="/licensing">Licensing Agreement</a>, and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </AuthLayout>
  );
}

export default Login;
