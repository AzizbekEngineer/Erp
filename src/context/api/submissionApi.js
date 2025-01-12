import { api } from ".";

export const submissionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getsubmission: build.query({
      query: (params) => ({
        url: `/submissions/all`,
        params,
      }),
      providesTags: ["Submission"],
    }),
    getsubmissionWork: build.query({
      query: (id) => ({
        url: `/submissions/daily-grades/${id}`,
      }),
      providesTags: ["Submission"],
    }),
    getsubmissiontotal: build.query({
      query: (id) => ({
        url: `/submissions/total-scores/${id}`,
      }),
      providesTags: ["Submission"],
    }),
    createsubmission: build.mutation({
      query: (id) => ({
        url: `/submissions/${id}/submit`,
        method: "POST",
      }),
      invalidatesTags: ["Submission"],
    }),
    deletesubmission: build.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Submission"],
    }),
    updatesubmission: build.mutation({
      query: ({ id, body }) => ({
        url: `/submissions/${id}/grade`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Submission"],
    }),
  }),
});

export const {
  useGetsubmissionQuery,
  useCreatesubmissionMutation,
  useDeletesubmissionMutation,
  useUpdatesubmissionMutation,
  useGetsubmissionWorkQuery,
  useGetsubmissiontotalQuery,
} = submissionApi;
