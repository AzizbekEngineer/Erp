import { api } from ".";

export const teacherApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: (params) => ({
        url: "/teachers",
        params,
      }),
      providesTags: ["Teacher", "Customer"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: "/teachers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
    updateTeacher: build.mutation({
      query: ({ id, body }) => ({
        url: `/teachers/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Teacher", "Customer"],
    }),
  }),
});

export const {
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherApi;
