import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { baseURL } from '../utils/baseURL';
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function AdminLogin() {
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

      const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${baseURL}/api/users/admin`, {
                username: data.username,
                password: data.password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if(response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Login Successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setMessage(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };
    
    

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            {...register("username", { required: true })}
            type="username"
            name="username"
            id="username"
            placeholder="UserName"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
          />
        </div>
        {message && (
          <p className="text-red-500 text-xs italic mb-3">{message}</p>
        )}
        <div >
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700  text-white font-bold px-8 py-2 rounded focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
      
      <p className="mt-5 text-center text-gray-500 text-xs ">
        All rights are reserved
      </p>
    </div>
  </div>
  )
}

export default AdminLogin;