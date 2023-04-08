import Api from '../services/API/Api';
import { useAppDispatch, useAppSelector } from './rtk';
import { setCardsList } from '../store/cardsListSlice';
import { setIsLoading } from '../store/loaderSlice';
import { setErrors, delErrors } from '../store/errorsSlice';

export default function useLoadDataCards() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.errors.errors);
  const cardsList = useAppSelector((state) => state.cardsList.cardsList);

  const loadDataByName = async (src: string): Promise<void> => {
    try {
      dispatch(setIsLoading(true));
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterByName(src);
      if (res) {
        dispatch(setCardsList(res));
      }
    } catch (err) {
      dispatch(setErrors([...errors, 'Error: something wrong with API...']));
      setTimeout(() => dispatch(delErrors()), 5000);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    cardsList,
    loadDataByName,
  };
}
