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

export interface ICardListResponse {
  results: ICardHome[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_PATH }),
  endpoints: (build) => ({
    fetchCards: build.query<ICardListResponse, { name: string; page: number }>({
      query: (args: { name: string; page: number }) => ({
        url: `/character`,
        params: {
          name: args.name,
          page: args.page,
        },
      }),
    }),
  }),
});
