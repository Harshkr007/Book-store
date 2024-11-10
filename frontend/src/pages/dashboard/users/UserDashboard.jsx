import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center">Error fetching orders data</div>;

    return (
        <div className="bg-gray-100 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <p className="text-gray-700 mb-6">Welcome, {currentUser?.name || 'User'}!</p>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-medium">Order ID: {order._id}</p>
                                        <p className="text-gray-600">{new Date(order?.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-green-600 font-semibold">Total: ${order.totalPrice}</p>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">Products:</p>
                                        <ul className="ml-4">
                                            {order.productIds.map((productId) => (
                                                <li key={productId} className="text-sm text-gray-500">{productId}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center py-4">You have no orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
