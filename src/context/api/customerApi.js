import { api } from ".";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: ({ page, budget, budgetDebt, filter, createdAt }) => ({
        url: `/get/customers?skip=${page}&paidToday=${budget}&debt=${budgetDebt}&budget=${filter}&createdAt=${createdAt}`,
      }),
      providesTags: ["Customer"],
    }),
    getCustomerById: build.query({
      query: (id) => ({
        url: `/get/customer/${id}`,
      }),
      providesTags: ["Customer"],
    }),
    createCustomer: build.mutation({
      query: (body) => ({
        url: "/create/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `/delete/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/customer/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = productApi;
