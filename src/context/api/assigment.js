import { api } from ".";

export const assigmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAssigment: build.query({
      query: (id) => ({
        url: `assignments/lesson/${id}`,
      }),
      providesTags: ["Assigment"],
    }),
    createAssigment: build.mutation({
      query: (body) => ({
        url: "/assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Assigment"],
    }),
    deleteassigment: build.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assigment"],
    }),
    updateAssigment: build.mutation({
      query: ({ id, body }) => ({
        url: `/assignments/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Assigment"],
    }),
  }),
});

export const {
  useGetAssigmentQuery,
  useCreateAssigmentMutation,
  useDeleteassigmentMutation,
  useUpdateAssigmentMutation,
} = assigmentApi;
