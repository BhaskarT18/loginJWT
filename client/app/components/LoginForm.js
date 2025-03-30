"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ loginid: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(formData)).unwrap(); // ✅ Wait for login action
      console.log("Login Successful:", response);
      router.push("/dashboard"); // ✅ Redirect on successful login
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {/* Error Message Display */}
      {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="loginid"
          placeholder="Enter your Login ID"
          value={formData.loginid}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
 