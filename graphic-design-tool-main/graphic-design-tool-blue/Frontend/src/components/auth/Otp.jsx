import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
 
import { Axis3DIcon } from "lucide-react";
 
function Otp() {
  const navigate = useNavigate();
 
  const authData = JSON.parse(localStorage.getItem("authData"));
  const email = authData?.email;
   const phone = authData?.phone;
 
 
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
 
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpInputs];
    newOtp[index] = value;
    setOtpInputs(newOtp);
    if (value && index < 5) {
      const nextInput = document.querySelectorAll(".otp-input")[index + 1];
      nextInput.focus();
    }
  };
 
// const handleVerify = async () => {
//   try {
//     const enteredOtp = otpInputs.join("");
 
//     if (enteredOtp.length !== 6) {
//       alert("Please enter 6 digit OTP");
//       return;
//     }
 
//       const res = await fetch("http://localhost:5050/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, phone, otp: enteredOtp  }),
//       });
 
//       const data = await res.json();
 
//       if (!res.ok) {
//         alert(data.msg);
//         return;
//       }
 
//       // 🔹 Save JWT for authenticated routes
//       localStorage.setItem("token", data.token);
 
//       alert(data.msg || "Login successful");
//       navigate("/dashboard"); // redirect to protected page
 
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };
 
   const handleVerify = async () => {
  try {
    const enteredOtp = otpInputs.join("");
 
    if (enteredOtp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }
 
      const res = await fetch("http://localhost:5050/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, otp: enteredOtp  }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        alert(data.msg);
        return;
      }
 
      // 🔹 Save JWT for authenticated routes
      localStorage.setItem("token", data.token);
 
      alert(data.msg || "Login successful");
      navigate("/dashboard"); // redirect to protected page
 
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };
   
  return (
    <AuthLayout>
      <h2>We sent you a code</h2>
      <p className="auth-subtitle">
        Enter the 6-digit code sent to <b>{email ? email : phone}</b>
      </p>
 
      <div className="otp-boxes">
        {otpInputs.map((digit, i) => (
          <input
            key={i}
            value={digit}
            maxLength="1"
            className="otp-input"
            onChange={(e) => handleChange(e.target.value, i)}
          />
        ))}
      </div>
 
      <button className="auth-button-login" onClick={handleVerify}>
        Continue
      </button>
 
      <p className="auth-terms-Otp">
        Didn’t get the code? Resend in 30 seconds
      </p>
    </AuthLayout>
  );
}
 
export default Otp;
 