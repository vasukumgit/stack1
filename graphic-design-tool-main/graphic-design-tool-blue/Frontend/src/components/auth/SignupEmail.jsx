import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import "./Auth.css";

function SignupEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromLogin = location.state?.email || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

// const handleSignup = async () => {
//   if (!name || !phone || !role) {
//     return alert("Please fill all fields");
//   }

//   try {
//     // 1️⃣ Send OTP to email
//     const res = await fetch("http://localhost:5050/api/auth/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: emailFromLogin }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.msg);
//       return;
//     }

//     // 2️⃣ Save user info for OTP verification
//     localStorage.setItem(
//       "signupData",
//       JSON.stringify({ name, email: emailFromLogin, phone, role })
//     );

//     navigate("/otp"); // go to OTP input page

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// }; 

  const handleSignup = async () => {
  if (!name || !phone || !role) {
    return alert("Please fill all fields");
  }
 
  try {
    const res = await fetch("http://localhost:5050/api/auth/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email: emailFromLogin,
        phone,
        role
      }),
    });
 
    const data = await res.json();
 
    if (!res.ok) {
      alert(data.msg);
      return;
    }
 
    // Save for OTP
    localStorage.setItem("authData", JSON.stringify({ email: emailFromLogin }));
 
    navigate("/otp");
 
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  return (
    <AuthLayout>
      <h2>Create an account</h2>
      <p className="auth-subtitle"> Create your account and start designing stunning visuals with ease </p>

      {/* 👇 User entered email display */}
      <div className="signup-email-display">
        {emailFromLogin}
      </div>

      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        className="auth-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select your role</option>
        <option>Designer</option>
        <option>Business</option>
        <option>Student</option>
      </select>

      <button className="auth-button-login" onClick={handleSignup}>
        Continue with Phone Number
      </button>

    </AuthLayout>
  );
}


export default SignupEmail;