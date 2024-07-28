import {useQuery} from '@tanstack/react-query';
import api from './api';
import {ReactQueryKeys} from './keys';

interface IStockPrice {
  stock: number;
  price: number;
}

export const useGetStockPriceQuery = (id: string) => {
  return useQuery<IStockPrice>({
    queryFn: async () => {
      const {data} = await api.get(`/stock-price/${id}`);
      return data;
    },
    queryKey: [ReactQueryKeys.STOCK_PRICE, id],
    refetchInterval: 5000,
  });
};
