import { api } from ".";

export const lessonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLesson: build.query({
      query: (params) => ({
        url: `/lessons/group`,
        params,
      }),
      providesTags: ["Lesson"],
    }),
    getLessonById: build.query({
      query: (id) => ({
        url: `/lessons/group/${id}`,
      }),
      providesTags: ["Lesson"],
    }),
    createLesson: build.mutation({
      query: (body) => ({
        url: "/lessons",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lesson"],
    }),
    deleteLesson: build.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
    updateLesson: build.mutation({
      query: ({ id, body }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
});

export const {
  useGetLessonQuery,
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
  useUpdateLessonMutation,
} = lessonApi;
