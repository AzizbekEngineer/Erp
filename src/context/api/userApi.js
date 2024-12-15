import { api } from ".";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/get/admins",
        params,
      }),
      providesTags: ["User"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/trade.namtech.uz/admin/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useRegisterUserMutation, useSignInMutation } =
  userApi;
