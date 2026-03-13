import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import "./Auth.css";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";


function LoginEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

//     const handleContinue = async () => {
//   if (!email) return alert("Enter email");

//   try {
//     // STEP 1 — check email
//     const res = await fetch("http://localhost:5050/api/auth/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({email }),
//     });

//     const data = await res.json();

//    if (!data.exists) {
//       navigate("/signup-email", { state: { email } });
//       return;
//     }

//     // ✅ Existing user → OTP page
//     localStorage.setItem("authData", JSON.stringify({ email }));
//     navigate("/otp");

//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };


  const handleContinue = async () => {
  if (!email) return alert("Enter email");
 
  try {
    // STEP 1 — check email
    const res = await fetch("http://localhost:5050/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email }),
    });
 
    const data = await res.json();
     
   if (data.isNewUser) {
      navigate("/signup-email", { state: { email } });
      return;
    }
 
    // ✅ Existing user → OTP page
    localStorage.setItem("authData", JSON.stringify({ email }));
    navigate("/otp");
 
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};




  // const handleContinue = () => {
  //   if (!email) return alert("Enter email");

  //   // Dummy existing user check
  //   const existingUsers = ["test@gmail.com", "chenchu@gmail.com"];
  //   if (existingUsers.includes(email)) {
  //     // Existing user → OTP
  //     navigate("/otp", { state: { email } });
  //   } else {
  //     // New user → Signup Email Flow
  //     navigate("/signup-email", { state: { email } });
  //   }
  // };

  return (
    <AuthLayout>
      <h2>Get started with your email</h2>
      <p className="auth-subtitle">
        Use your email or Google account to continue to Stackly
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="auth-button-login" onClick={handleContinue}>
        Continue
      </button>

      <p className="auth-terms-LoginEmail">
        Having Trouble logging in?
        <a href="#"> Contact Support<ArrowUpRightIcon className="footer-arrow-icon" /></a>
      </p>
    </AuthLayout>
  );
}

export default LoginEmail;