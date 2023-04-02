import { ICardHome } from '../components/parts/CardHome/CardHome';
import { useState } from 'react';
import Api from '../services/API/Api';

export default function useLoadDataCards() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICardHome[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const addErrors = (error: string) => {
    setErrors((prev) => {
      return [...prev, error];
    });
    setTimeout(() => {
      setErrors((prev) => {
        return prev.slice(1);
      });
    }, 5000);
  };

  const loadData = async (src: string): Promise<void> => {
    try {
      setIsLoading(true);
      const ApiService = new Api();
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
    addErrors,
    loadData,
  };
}
