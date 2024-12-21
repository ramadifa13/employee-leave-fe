import { getAuthToken } from "@/commons/token";
import { Employee } from "@/commons/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        birthDate: string;
        gender: string;
      }) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => "/user/profile",
    }),
    getAdmins: builder.query({
      query: () => "/admin",
    }),
    getEmployees: builder.query({
      query: () => "/employee",
    }),
    getLeaveRequests: builder.query({
      query: () => "/leave-requests",
    }),
    getEmployeesPaginated: builder.query({
      query: ({ page, limit }) => `/employee?page=${page}&limit=${limit}`,
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employee/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    addEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useGetAdminsQuery,
  useGetEmployeesQuery,
  useGetLeaveRequestsQuery,
  useGetEmployeesPaginatedQuery,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation,
} = api;
