import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

interface IApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
/*   baseQuery: retry(fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
    prepareHeaders(headers) {
      headers.set("x-api-key", "asdASDASda34sasdaSDad");

      return headers;
    },
  }), {
    maxRetries: 3, // Number of request made if the first time fail
  }), 
  */

  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
    prepareHeaders(headers) {
      headers.set("x-api-key", "asdASDASda34sasdaSDad");

      return headers;
    },
  }),

  /**
   * Amount of time we want to keep data in cache for all api, (this value is in seconds, default is 60 seconds)
   */
  // keepUnusedDataFor: 5,

  /**
   * Revalidate cache data in background
   * We can add a number by value to revalidate after # of seconds selected
   */

  // refetchOnMountOrArgChange: true, // or pass number of seconds ex: 5

  /**
   * Revalidate data when user put focus on page with this component
   */
  // refetchOnFocus: true,

  /**
   * Revalidate the server data when lost and reconnect to internet to check is the cache data is equal to server data
   */
  // refetchOnReconnect: true,

  endpoints(builder) {
    return {
      fetchCharacters: builder.query<IApiResponse, string | void>({
        query(gender = "male") {
          return `/character?gender=${gender}`;
        },
        // extraOptions: { maxRetries: 2 }
        // keepUnusedDataFor: 5 -> Amount of time we want to keep data in cache for this endpoint
      }),

      fetchCharacterById: builder.query<ICharacter, number>({
        query: (characterId) => `/character/${characterId}`,
        extraOptions: { maxRetries: 3 }
      }),

      fetchGenderMale: builder.query<IApiResponse, null>({
        query() {
          return `/character?gender=male`;
        },
      }),
    };
  },
});

export const {
  useFetchCharactersQuery,
  useFetchGenderMaleQuery,
  useFetchCharacterByIdQuery,
  useLazyFetchCharactersQuery
} = apiSlice;

export const selectCharacter = (id: number) => apiSlice.endpoints.fetchCharacterById.select(id)
