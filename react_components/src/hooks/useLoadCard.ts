import { ICardHome } from '../components/parts/CardHome/CardHome';
import Api from '../services/API/Api';
import { setIsLoading } from '../store/loaderSlice';
import { setErrors, delErrors } from '../store/errorsSlice';
import { useAppDispatch, useAppSelector } from './rtk';

export default function useLoadCard(setModal: (card: ICardHome) => void) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.errors.errors);

  const loadDataById = async (id: number): Promise<void> => {
    try {
      dispatch(setIsLoading(true));
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterById(id);
      if (res) setModal(res);
    } catch (err) {
      dispatch(setErrors([...errors, 'Error: something wrong with API...']));
      setTimeout(() => dispatch(delErrors()), 5000);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    loadDataById,
  };
}
