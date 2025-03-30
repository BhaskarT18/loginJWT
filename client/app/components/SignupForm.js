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
    const res = await dispatch(signupUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

      {/* Error Message Display */}
      {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        {[
          { name: "loginid", type: "text", placeholder: "Login ID" },
          { name: "firstname", type: "text", placeholder: "First Name" },
          { name: "lastname", type: "text", placeholder: "Last Name" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "mobile", type: "tel", placeholder: "Mobile" },
          { name: "password", type: "password", placeholder: "Password", minLength: 6 },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required
            minLength={field.minLength || undefined}
            className="w-full border p-2 rounded mb-3"
          />
        ))}

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
