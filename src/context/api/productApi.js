import { api } from "./index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (body) => ({
        url: "create/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product", "Seller"],
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
