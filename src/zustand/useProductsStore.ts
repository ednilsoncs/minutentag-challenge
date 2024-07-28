import {create} from 'zustand';
import {IProduct} from '../services/useGetProductsListQuery';

export type IProductStore = Omit<IProduct, 'skus'> & {
  skus: {
    code: string;
    name: string;
    stock?: number;
    price?: number;
  }[];
};

interface IItemStock {
  productItemId: number;
  code: string;
  price: number;
  stock: number;
}

interface ProductStore {
  inventory: {
    list: IProductStore[];
    onSetProducts: (products: IProductStore[]) => void;
    onUpdateStock: (item: IItemStock) => void;
  };
}

export const useProductStore = create<ProductStore>()(set => ({
  inventory: {
    list: [],
    onSetProducts: value =>
      set(state => ({
        inventory: {
          ...state.inventory,
          list: value,
        },
      })),

    onUpdateStock: item =>
      set(state => {
        const findProductIndex = state.inventory.list.findIndex(
          product => product.id === item.productItemId,
        );

        const product = state.inventory.list[findProductIndex];

        if (findProductIndex === -1) return state;

        const skuIndex = product.skus.findIndex(sku => sku.code === item.code);

        if (skuIndex !== -1) {
          const updatedSkus = [...product.skus];
          updatedSkus[skuIndex] = {
            ...updatedSkus[skuIndex],
            stock: item.stock,
            price: item.price,
          };

          const updatedList = [...state.inventory.list];
          updatedList[findProductIndex] = {
            ...product,
            skus: updatedSkus,
          };

          return {
            inventory: {
              ...state.inventory,
              list: updatedList,
            },
          };
        }

        return state;
      }),
  },
}));
