import {useQuery} from '@tanstack/react-query';
import api from './api';
import {ReactQueryKeys} from './keys';

export interface IProduct {
  id: number;
  rating: string;
  brand: string;
  image: string;
  style: string;
  substyle: string;
  abv: string;
  origin: string;
  information: string;
  price: number;
  skus: {
    code: string;
    name: string;
  }[];
}

export const useGetProductsListQuery = ({enable}: {enable: boolean}) => {
  return useQuery<IProduct[]>({
    queryFn: async () => {
      const {data} = await api.get('/products');
      return data;
    },
    enabled: enable,
    queryKey: [ReactQueryKeys.PRODUCTS],
  });
};
