import React from 'react';
import App from './App';
import errorsSlice from './store/errorsSlice';
import formSlice from './store/formSlice';
import loaderSlice from './store/loaderSlice';
import searchReducer from './store/searchSlice';
import { Provider } from 'react-redux';
import {
  PipeableStream,
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { cardApi, cardsApi } from './services/CardsService';
import { configureStore } from '@reduxjs/toolkit';

export function renderApp(url: string, opts: RenderToPipeableStreamOptions): PipeableStream {
  const store = configureStore({
    reducer: {
      search: searchReducer,
      loader: loaderSlice,
      errors: errorsSlice,
      form: formSlice,
      [cardApi.reducerPath]: cardApi.reducer,
      [cardsApi.reducerPath]: cardsApi.reducer,
    },
    middleware: [],
  });

  const stream = renderToPipeableStream(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>,
    opts
  );
  return stream;
}
