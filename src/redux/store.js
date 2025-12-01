import { configureStore} from "@reduxjs/toolkit";
import { githubApi } from "./services/octokit";
export const store = configureStore({
    reducer: {
        // search: searchReducer,
        [githubApi.reducerPath]:githubApi.reducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
