import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import {ArrowLeft, Bag, Dots} from '../../../components/icons';
import detailScreenStyles from './index.module.scss';
import {useGetProductsListQuery} from '../../../services/useGetProductsListQuery';
import {
  IProductStore,
  useProductStore,
} from '../../../zustand/useProductsStore';
import ProductOption from '../../../components/productOption';

const MAX_CARACTERES = 217;

const DetailScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [product, setProduct] = useState<IProductStore | undefined>();
  const [optionIdSelected, setOptionIdSelected] = useState('');
  const {productIdentifier} = useParams();
  const {
    inventory: {list, onSetProducts},
  } = useProductStore();
  const {data: productsDataList} = useGetProductsListQuery({
    enable: list.length === 0,
  });

  const id = useMemo(() => {
    if (!productIdentifier) {
      return '';
    }
    return productIdentifier.split('-')[0];
  }, [productIdentifier]);

  useEffect(() => {
    const findProduct = list.find(item => {
      return String(item.id) === id;
    });
    setProduct(findProduct);
  }, [id, list]);

  useEffect(() => {
    if (productsDataList) onSetProducts(productsDataList);
  }, [onSetProducts, productsDataList]);

  // const {data} = useGetStockPriceQuery();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    window.alert('Added to cart');
  };

  const handleOpenOptions = () => {
    window.alert('Open menu');
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChooseOption = (sku: string) => {
    setOptionIdSelected(sku);
  };

  const inventoryQuantity = useMemo(() => {
    if (!product) {
      return 0;
    }

    let sumInventory = 0;

    product.skus.forEach(sku => {
      if (sku.stock) {
        sumInventory += sku.stock;
      }
    });

    return sumInventory;
  }, [product]);

  if (!product) {
    return (
      <div>
        <span>loading...</span>
      </div>
    );
  }

  const isTextLong = product?.information?.length > MAX_CARACTERES;

  const displayText = !isExpanded
    ? product.information.slice(0, MAX_CARACTERES) + (isTextLong ? '...' : '')
    : product.information;

  return (
    <div>
      <div className={detailScreenStyles.header}>
        <button
          className={detailScreenStyles.backButton}
          onClick={onBack}
          type="button"
          aria-label="Back Button"
        >
          <ArrowLeft />
        </button>
        <h1 className={detailScreenStyles.title}>Detail</h1>
        <button
          type="button"
          aria-label="Open Options"
          className={detailScreenStyles.optionsButton}
          onClick={() => {
            handleOpenOptions();
          }}
        >
          <Dots />
        </button>
      </div>

      <div className={detailScreenStyles.body}>
        <img src={product?.image} height={240} alt={product?.brand} />

        <div className={detailScreenStyles.card}>
          <div className={detailScreenStyles.headerCard}>
            <div className={detailScreenStyles.title}>
              <span className={detailScreenStyles.productName}>
                {product.brand}
              </span>
              <div className={detailScreenStyles.specifications}>
                <span>Origin: {product.origin} |</span>
                <span>Stock: {inventoryQuantity}</span>
              </div>
            </div>
            <span className={detailScreenStyles.price}>
              {(product.price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>

          <div className={detailScreenStyles.description}>
            <span className={detailScreenStyles.sectionsTitle}>
              Description
            </span>
            {isTextLong ? (
              <span className={detailScreenStyles.text}>
                {displayText}
                <span
                  key={0}
                  tabIndex={0}
                  onKeyDown={toggleText}
                  className={detailScreenStyles.readMore}
                  role="button"
                  onClick={toggleText}
                >
                  {isExpanded ? ' Read Less' : ' Read More'}
                </span>
              </span>
            ) : (
              <span className={detailScreenStyles.text}>
                {product.information}
              </span>
            )}
          </div>
          <div className={detailScreenStyles.options}>
            <span className={detailScreenStyles.sectionsTitle}>Size</span>
            <div className={detailScreenStyles.optionsButtons}>
              {product.skus.map(sku => {
                return (
                  <ProductOption
                    key={sku.code}
                    onSelect={() => {
                      handleChooseOption(sku.code);
                    }}
                    code={sku.code}
                    productItemId={product.id}
                    name={sku.name}
                    ative={optionIdSelected === sku.code}
                  />
                );
              })}
            </div>
          </div>
          <div className={detailScreenStyles.cart}>
            <div className={detailScreenStyles.bag}>
              <Bag />
            </div>

            <button
              onClick={handleAddToCart}
              className={detailScreenStyles.buttonAdd}
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
