import { ICardHome } from '../components/parts/CardHome/CardHome';
import { useContext, useState } from 'react';
import Api from '../services/API/Api';
import { ErrorContext, LoaderContext } from '../components/parts/Layout';

export default function useLoadDataCards() {
  const [data, setData] = useState<ICardHome[]>([]);
  const loaderContext = useContext(LoaderContext);
  const errorContext = useContext(ErrorContext);

  const loadDataByName = async (src: string): Promise<void> => {
    try {
      loaderContext.setIsLoading(true);
      const ApiService = new Api(import.meta.env.VITE_API_PATH);
      const res = await ApiService.getCharacterByName(src);
      if (res) setData(res);
    } catch (err) {
      errorContext.addErrors('Error: something wrong with API...');
    } finally {
      loaderContext.setIsLoading(false);
    }
  };

  return {
    data,
    loadDataByName,
  };
}
