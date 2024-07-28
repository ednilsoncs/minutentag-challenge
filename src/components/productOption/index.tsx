import React, {useEffect} from 'react';
import {useGetStockPriceQuery} from '../../services/useGetStockPriceQuery';
import productOptionStyle from './index.module.scss';
import {useProductStore} from '../../zustand/useProductsStore';

interface IProductOption extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  code: string;
  name: string;
  ative: boolean;
  productItemId: number;
  onSelect(): void;
}

const ProductOption: React.FC<IProductOption> = ({
  productItemId,
  code,
  name,
  ative,
  onSelect,
  ...props
}) => {
  const {data, error} = useGetStockPriceQuery(code);
  const {
    inventory: {onUpdateStock},
  } = useProductStore();
  useEffect(() => {
    if (data)
      onUpdateStock({
        productItemId,
        code,
        stock: data?.stock,
        price: data?.price,
      });
  }, [code, data, onUpdateStock, productItemId]);

  if (error || data?.stock === 0) {
    return null;
  }
  return (
    <button
      onClick={onSelect}
      className={`${productOptionStyle.buttonDeactivate} ${ative ? productOptionStyle.buttonActivate : ''}`}
      type="button"
      {...props}
    >
      {name}
    </button>
  );
};

export default ProductOption;
