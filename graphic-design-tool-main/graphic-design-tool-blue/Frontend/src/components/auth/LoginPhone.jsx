import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { ArrowUpRightIcon, ArrowLeftIcon  } from "@heroicons/react/24/outline";

 
function LoginPhone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
 
  // PhoneLogin.jsx
// const handlePhoneLogin = async () => {
//    if (phone.length !== 10) {
//       alert("Phone number must be 10 digits");
//       return;}
//   try {
//     const res = await fetch("http://localhost:5050/api/auth/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone }),
//     });

//     const data = await res.json();
//    if (!data.exists) {
//       navigate("/signup-phone", { state: { phone } });
//       return;
//     }

//     localStorage.setItem("authData", JSON.stringify({ phone }));
//     navigate("/otp");

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };
 

const handlePhoneLogin = async () => {
   if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;}
  try {
    const res = await fetch("http://localhost:5050/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
 
    const data = await res.json();
   if (data.isNewUser) {
      navigate("/signup-phone", { state: { phone } });
      return;
    }
 
    localStorage.setItem("authData", JSON.stringify({ phone }));
    navigate("/otp");
 
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
 
 
  return (
    <AuthLayout>

      <div className="header">
         {/* 🔙 Back Button */}
        <button
          className="back-button"
          onClick={() => navigate()}
        >
          <ArrowLeftIcon className="back-icon" />
        </button>
        <h2>Get started with your phone number</h2>
      </div>
      <p className="auth-subtitle">
        Enter your mobile number to continue to Stackly
      </p>
 
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
      />
 
      <button className="auth-button-login" onClick={handlePhoneLogin}>
        Continue
      </button>
 
      <p className="auth-terms-LoginPhone">
        Having Trouble logging in?
        <a href="#"> Contact Support<ArrowUpRightIcon className="footer-arrow-icon" /></a>
      </p>
    </AuthLayout>
  );
}
 
export default LoginPhone;