import { ICardHome } from '../components/parts/CardHome/CardHome';
import Api from '../services/API/Api';
import useAddError from './useAddError';

export default function useLoadCard(
  setModal: (card: ICardHome) => void,
  setIsLoading: (arg: boolean) => void
) {
  const { errors, addErrors } = useAddError(5000);

  const loadDataById = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterById(id);
      if (res) setModal(res);
    } catch (err) {
      addErrors('Error: something wrong with API...');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors,
    loadDataById,
  };
}
