import { api } from ".";

export const submissionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSubmission: build.query({
      query: (params) => ({
        url: `/submissions/all`,
        params,
      }),
      providesTags: ["Submission"],
    }),
    getSubmissionWork: build.query({
      query: (id) => ({
        url: `/submissions/daily-grades/${id}`,
      }),
      providesTags: ["Submission"],
    }),
    getSubmissionTotal: build.query({
      query: (id) => ({
        url: `/submissions/total-scores/${id}`,
      }),
      providesTags: ["Submission"],
    }),
    createSubmission: build.mutation({
      query: ({ id, body }) => ({
        url: `/submissions/${id}/submit`,
        method: "POST",
      }),
      invalidatesTags: ["Submission"],
    }),
    deleteSubmission: build.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Submission"],
    }),
    updateSubmission: build.mutation({
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
  useGetSubmissionQuery,
  useCreateSubmissionMutation,
  useDeleteSubmissionMutation,
  useUpdateSubmissionMutation,
  useGetSubmissionWorkQuery,
  useGetSubmissionTotalQuery,
} = submissionApi;
