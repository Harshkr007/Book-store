import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseURL } from '../../../utils/baseURL'



const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}/api/orders`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
}})

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/create",
                method: "POST",
                body: newOrder,
            })
        }),
        getOrderByEmail: (builder.query) ({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ["Orders"],
        })

    })

})
export const { useCreateOrderMutation,useGetOrderByEmailQuery} = orderApi;
export default orderApi;