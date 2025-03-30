"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice/authSlice";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    loginid: "",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser(formData)).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Signup Failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="loginid"
          placeholder="Login ID"
          value={formData.loginid}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
