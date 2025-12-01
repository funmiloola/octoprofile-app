import { Octokit } from "@octokit/rest";
import { createApi } from "@reduxjs/toolkit/query/react";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_ACCESS_TOKEN,
});

const octokitQuery = async (arg) => {
  const { request, args } = arg;

  try {
    const response = await octokit.request(request, args);
    return { data: response.data };
  } catch (error) {
    return { error: { status: error.status, data: error.message } };
  }
};

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: octokitQuery,
  endpoints: (builder) => ({
    searchUsers: builder.query({
     query: (username) => ({
    request: "GET /users/{username}",
    args: { username }
  })
    }),
      getRepos: builder.query({
          query: (username) => ({
              request: "GET /users/{username}/repos",
              args:{username }
          })
      }),
      mostLanguage: builder.query({
          query: ({ owner, repo }) => ({
              request: "GET /repos/{owner}/{repo}/languages",
              args:{owner,repo}
        })
    })
  }),
});

export const { useSearchUsersQuery,useMostLanguageQuery,useGetReposQuery } = githubApi;
