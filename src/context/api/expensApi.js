import { api } from "./index";

export const ExpensAPi = api.injectEndpoints({
  endpoints: (build) => ({
    getExpens: build.query({
      query: (params) => ({
        url: "/get/expenses",
        params,
      }),
      providesTags: ["Expens", "Seller"],
    }),
    getExpensById: build.query({
      query: (id) => ({
        url: `/expens/${id}`,
      }),
      providesTags: ["Expens", "Seller"],
    }),
    createExpens: build.mutation({
      query: (body) => ({
        url: "/create/expense",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expens", "Seller"],
    }),
    deleteExpens: build.mutation({
      query: (id) => ({
        url: `/delete/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expens", "Seller"],
    }),
    updateExpens: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/expense/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Expens", "Seller"],
    }),
  }),
});

export const {
  useGetExpensQuery,
  useGetExpensByIdQuery,
  useCreateExpensMutation,
  useDeleteExpensMutation,
  useUpdateExpensMutation,
} = ExpensAPi;
