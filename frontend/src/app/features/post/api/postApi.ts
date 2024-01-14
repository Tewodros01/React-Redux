import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const postApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({}),
});
