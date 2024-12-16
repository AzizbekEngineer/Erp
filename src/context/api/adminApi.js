import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({
        url: "/profile",
        params,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    getAdminById: build.query({
      query: (id) => ({
        url: `/get/payments/${id}`,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    createAdmin: build.mutation({
      query: (body) => ({
        url: "/create/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/delete/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/profile`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = productApi;
