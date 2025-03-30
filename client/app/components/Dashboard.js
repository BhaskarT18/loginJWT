"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserData } from "../redux/authSlice/authSlice";
import Cookies from "js-cookie";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {loading ? <p>Loading user data...</p> : user ? (
        <div>
          <p><strong>Login ID:</strong> {user.loginid}</p>
          <p><strong>Full Name:</strong> {user.firstname} {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
        </div>
      ) : <p>Error loading user data</p>}
    </div>
  );
};

export default Dashboard;
