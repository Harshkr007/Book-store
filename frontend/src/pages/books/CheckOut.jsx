import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../store/features/order/orderApiSlice";
import Swal from 'sweetalert2'

function CheckOut() {
  const [isChecked, setIsChecked] = useState(false); 

  const navigate = useNavigate();

 const {currentUser} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const [createOrder,{isLoading}] = useCreateOrderMutation();

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipCode: data.zipcode,
      },
      phone: data.phone,
      productsIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };
    console.log(newOrder);
    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirmed Order",
        text: "Your order placed successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okey"
      });
      alert("Order created successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };


  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Cash On Delivery
              </h2>
              <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
              <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
            </div>
            {cartItems.length > 0 ? (
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                >
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">Full Name</label>
                        <input
                          {...register("name", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.name && (
                          <span className="text-red-500">Name is required</span>
                        )}
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          disabled
                          value={currentUser?.email}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          {...register("phone", { required: true })}
                          type="tel"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.phone && (
                          <span className="text-red-500">
                            Phone is required
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address">Address / Street</label>
                        <input
                          {...register("address", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.address && (
                          <span className="text-red-500">
                            Address is required
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <input
                          {...register("city", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.city && (
                          <span className="text-red-500">City is required</span>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">Country</label>
                        <input
                          {...register("country", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.country && (
                          <span className="text-red-500">
                            Country is required
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state">State</label>
                        <input
                          {...register("state", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.state && (
                          <span className="text-red-500">
                            State is required
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          {...register("zipcode", { required: true })}
                          type="text"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        {errors.zipcode && (
                          <span className="text-red-500">
                            Zipcode is required
                          </span>
                        )}
                      </div>

                      <div className="md:col-span-5 mt-3">
                        <div className="inline-flex items-center">
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="form-checkbox"
                          />
                          <label className="ml-2">
                            I agree to the{" "}
                            <Link className="underline underline-offset-2 text-blue-600">
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link className="underline underline-offset-2 text-blue-600">
                              Shopping Policy
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            type="submit"
                            disabled={!isChecked}
                            className={`${
                              isChecked
                                ? "bg-blue-500 hover:bg-blue-700"
                                : "bg-gray-400"
                            } text-white font-bold py-2 px-4 rounded`}
                          >
                            Place an Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <p>Please add Items</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
