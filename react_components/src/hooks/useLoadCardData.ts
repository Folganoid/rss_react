import { ICardHome } from '../components/parts/CardHome/CardHome';
import { useState } from 'react';
import Api from '../services/API/Api';
import useAddError from './useAddError';

export default function useLoadDataCards() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICardHome[]>([]);
  const { errors, addErrors } = useAddError(5000);

  const loadDataByName = async (src: string): Promise<void> => {
    try {
      setIsLoading(true);
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterByName(src);
      if (res) setData(res);
    } catch (err) {
      addErrors('Error: something wrong with API...');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    errors,
    isLoading,
    loadDataByName,
  };
}
