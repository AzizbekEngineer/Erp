import { api } from ".";

export const groupApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query({
      query: (params) => ({
        url: `/groups`,
        params,
      }),
      providesTags: ["Group"],
    }),
    getGroupsCourseId: build.query({
      query: (params) => ({
        url: `/groups/course${id}`,
        params,
      }),
      providesTags: ["Group"],
    }),
    getGroupById: build.query({
      query: (id) => ({
        url: `/groups/${id}`,
      }),
      providesTags: ["Group"],
    }),
    createGroup: build.mutation({
      query: (body) => ({
        url: "/groups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
    updateGroup: build.mutation({
      query: ({ id, body }) => ({
        url: `/groups/${id}`,
        method: "PATCH", // or "PATCH"
        body,
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupsCourseIdQuery,
  useGetGroupByIdQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
} = groupApi;
