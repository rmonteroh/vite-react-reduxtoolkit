import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

interface ApiResponse {
  info: {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null,
  },
  results: Character[]
}

interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: {
    name: string,
    url: string,
  },
  location: {
    name: string,
    url: string,
  },
  image: string,
  episode: string[],
  url: string,
  created: string,
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
    prepareHeaders(headers) {
      headers.set('x-api-key', 'asdASDASda34sasdaSDad');

      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchCharacters: builder.query<ApiResponse, string | void>({
        query(gender = 'male'){
          return `/character?gender=${gender}`
        }
      }),
      fetchGenderMale: builder.query<ApiResponse, null>({
        query(){
          return `/character?gender=male`
        }
      })
    }
  }
});

export const { useFetchCharactersQuery, useFetchGenderMaleQuery } = apiSlice;

