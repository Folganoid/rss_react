import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICardHome } from 'components/parts/CardHome/CardHome';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_PATH }),
  endpoints: (build) => ({
    fetchCard: build.query<ICardHome, number>({
      query: (id: number) => ({
        url: `/character/${id}`,
      }),
    }),
  }),
});
