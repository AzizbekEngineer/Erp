import { api } from ".";

export const studentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudent: build.query({
      query: (params) => ({
        url: "/students",
        params,
      }),
      providesTags: ["Student"],
    }),
    createStudent: build.mutation({
      query: (body) => ({
        url: "/students",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: build.mutation({
      query: ({ id, body }) => ({
        url: `/students/${id}`,
        method: "PUT", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
