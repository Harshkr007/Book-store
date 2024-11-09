import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}/api/books`,//assign the primary url to send request
    credentials: 'include',         //incluede cookies if avilable
    prepareHeaders:(Headers) => {   //include the authentication token if present 
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: "bookApi",
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks : builder.query({
            query: () => "/",
            providesTags: ['Books']
        }),
        fetchBookById: builder.query({
            query: (id) => `/get-single-book/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi;
export default booksApi;