import { api } from ".";

export const teacherApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: (params) => ({
        url: "/teachers",
        params,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: "/teachers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    updateTeacher: build.mutation({
      query: ({ id, body }) => ({
        url: `/teachers/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
  }),
});

export const {
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherApi;
