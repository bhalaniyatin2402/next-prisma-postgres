"use-client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include'
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/users/signup',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data
      })
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/users/verify',
        method: "POST",
        body: data
      })
    }),
    getLoggedInUserDetails: builder.query({
      query: ({ id }) => `/users/me?id=${id}`,
      providesTags: ["User"]
    }),
    getCategoryList: builder.query({
      query: () => "/categories/get"
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: '/categories/add',
        method: "POST",
        body: data
      })
    }),
    addToMySavedList: builder.mutation({
      query: (data) => ({
        url: "/users/categories/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["User"]
    }),
    removeFromMySavedList: builder.mutation({
      query: (data) => ({
        url: "/users/categories/remove",
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["User"]
    }),
  })
})

export const {
  useSignupMutation,
  useLoginMutation,
  useGetLoggedInUserDetailsQuery,
  useVerifyEmailMutation,
  useAddCategoryMutation,
  useGetCategoryListQuery,
  useAddToMySavedListMutation,
  useRemoveFromMySavedListMutation
} = api
export default api
