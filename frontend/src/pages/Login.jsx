import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);

      const res = await axios.post("http://127.0.0.1:8000/login", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("token", res.data.access_token); // ✅ save token only here
      navigate("/"); // ✅ redirect to homepage after login
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleLogin}
        className="max-w-2xl w-full p-10 rounded-2xl border border-blue-800 backdrop-blur-md bg-white/10 shadow-[0_0_40px_#2563eb66] text-white transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-blue-400 text-center drop-shadow-[0_1px_3px_rgba(37,99,235,0.7)]">
          User Login
        </h2>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-5 py-4 mb-6 rounded-xl border border-blue-600 bg-[#101827] placeholder:text-blue-300 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-5 py-4 mb-8 rounded-xl border border-blue-600 bg-[#101827] placeholder:text-blue-300 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:shadow-blue-500/40 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
