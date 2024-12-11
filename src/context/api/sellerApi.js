import { api } from "./index";

export const SellerAPi = api.injectEndpoints({
  endpoints: (build) => ({
    getSeller: build.query({
      query: (params) => ({
        url: "/get/sellers",
        params,
      }),
      providesTags: ["Seller"],
    }),
    getSellerById: build.query({
      query: (id) => ({
        url: `/seller/${id}`,
      }),
      providesTags: ["Seller"],
    }),
    getSellerSearch: build.query({
      query: (params) => ({
        url: `/get/sellers/search`,
        params,
      }),
      providesTags: ["Seller"],
    }),
    createSeller: build.mutation({
      query: (body) => ({
        url: "/create/seller",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
    deleteSeller: build.mutation({
      query: (id) => ({
        url: `/delete/seller/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seller"],
    }),
    updateSeller: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/seller/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Seller"],
    }),
  }),
});

export const {
  useGetSellerQuery,
  useGetSellerByIdQuery,
  useGetSellerSearchQuery,
  useCreateSellerMutation,
  useDeleteSellerMutation,
  useUpdateSellerMutation,
} = SellerAPi;
