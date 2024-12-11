import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPaymets: build.query({
      query: (params) => ({
        url: "/get/payments",
        params,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    getPaymetById: build.query({
      query: (id) => ({
        url: `/get/payments/${id}`,
      }),
      providesTags: ["Payment", "Customer"],
    }),
    createPaymet: build.mutation({
      query: (body) => ({
        url: "/create/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
    deletePaymet: build.mutation({
      query: (id) => ({
        url: `/delete/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
    updatePaymet: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/payment/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Payment", "Customer"],
    }),
  }),
});

export const {
  useGetPaymetsQuery,
  useGetPaymetByIdQuery,
  useCreatePaymetMutation,
  useDeletePaymetMutation,
  useUpdatePaymetMutation,
} = productApi;
