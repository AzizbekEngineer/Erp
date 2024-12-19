import { api } from ".";

export const teacherApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: (params) => ({
        url: "/profile",
        params,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    getTeacherById: build.query({
      query: (id) => ({
        url: `/get/payments/${id}`,
      }),
      providesTags: ["Admin", "Customer"],
    }),
    createTeacher: build.mutation({
      query: (body) => ({
        url: "/create/payment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/delete/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
    updateTeacher: build.mutation({
      query: ({ id, body }) => ({
        url: `/update/profile`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Admin", "Customer"],
    }),
  }),
});

export const {} = teacherApi;
