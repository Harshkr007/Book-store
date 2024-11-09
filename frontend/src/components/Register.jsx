import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const {registerUser,signInWithGoogle} = useAuth();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();


    //register user
    const onSubmit = async (data) => {
      console.log(data);
      try {
        await registerUser(data.email,data.password);
        alert("User registration successfull")
      } catch (error) {
        setMessage("Plese provide a valid email and password")
      }

    };

    const handleGoogleSignIn = async () => {
      try {
        await signInWithGoogle();
        alert("Login successful with Google")
        navigate("/")
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Plese Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
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
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700  text-white font-bold px-8 py-2 rounded focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account?Please
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        {/*Google sign in*/}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 item-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs ">
          All rights are reserved
        </p>
      </div>
    </div>
  )
}

export default Register