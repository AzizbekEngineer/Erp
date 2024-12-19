import { api } from ".";

export const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: ({ params }) => ({
        url: ``,
        params,
      }),
      providesTags: ["Course"],
    }),
    getCourseById: build.query({
      query: (id) => ({
        url: `/get/Course/${id}`,
      }),
      providesTags: ["Course"],
    }),
    createCourse: build.mutation({
      query: (body) => ({
        url: "/create/Course",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `/delete/Course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/Course/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
