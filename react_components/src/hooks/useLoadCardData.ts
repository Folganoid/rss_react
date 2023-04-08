import { useContext } from 'react';
import Api from '../services/API/Api';
import { ErrorContext, LoaderContext } from '../components/parts/Layout';
import { useAppDispatch, useAppSelector } from './rtk';
import { setCardsList } from '../store/cardsListSlice';

export default function useLoadDataCards() {
  const loaderContext = useContext(LoaderContext);
  const errorContext = useContext(ErrorContext);
  const dispatch = useAppDispatch();
  const cardsList = useAppSelector((state) => state.cardsList.cardsList);

  const loadDataByName = async (src: string): Promise<void> => {
    try {
      loaderContext.setIsLoading(true);
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterByName(src);
      if (res) {
        dispatch(setCardsList(res));
      }
    } catch (err) {
      errorContext.addErrors('Error: something wrong with API...');
    } finally {
      loaderContext.setIsLoading(false);
    }
  };

  return {
    cardsList,
    loadDataByName,
  };
}
