import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IServerResponse, IUser, IRepo } from "../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      query: (search: string) => ({
        url: "search/users",
        params: {
          q: search,
          per_page: 10,
        },
      }),
      transformResponse: (response: IServerResponse<IUser>) => {
        return response.items;
      },
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
