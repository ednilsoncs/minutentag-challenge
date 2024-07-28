import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {Menu, Plus, Star} from '../../../components/icons';
import {useGetProductsListQuery} from '../../../services/useGetProductsListQuery';
import listScreenStyles from './index.module.scss';
import {useProductStore} from '../../../zustand/useProductsStore';

const ListScreen = () => {
  const {
    inventory: {list, onSetProducts},
  } = useProductStore();

  const {data} = useGetProductsListQuery({enable: true});

  const navigate = useNavigate();
  const handleAddToCart = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    window.alert('Add cart');
  };
  const handleOpenMenu = () => {
    window.alert('Open menu');
  };
  useEffect(() => {
    if (data) onSetProducts(data);
  }, [data, onSetProducts]);
  const navigateItem = ({id, brand}: {id: number; brand: string}) => {
    const formattedBrand = brand.toLowerCase().replace(' ', '-');
    const itemParam = `${id}-${formattedBrand}`;
    navigate(`/product/${itemParam}`);
  };

  return (
    <div>
      <div className={listScreenStyles.header}>
        <button
          aria-label="menu"
          className={listScreenStyles.menuButton}
          type="button"
          onClick={handleOpenMenu}
        >
          <Menu />
        </button>
        <img
          src="https://s3-alpha-sig.figma.com/img/b2d7/6a1e/3828dd5e06206c6bbd452ca5ef9389e4?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fmmf0ZaxL5mRbGG2vVE0zmNUwlfEwGofWfKP3vkvF8pah9ojpsbNU~0FeVvRR2V-DN23e2XIHFi2ltKx8nXC0pqhMb7WRBcsgcPXYqGjiaImC~m9YllqDPxsGZhHEE4BKmfKAkLM9VF5ReBGTLUV54NozLVeomJYACbv1nFfLRi6pxiRXXQQzwmyTGeMSLBMeUlrjXzCNdxZdCx~DP66f7G8gXtNAK6KeZAXnuKTNj~yKA25Bi8Vq~4XFKitXZPJEYalPIwvytwkNEEGrENV5A2N7W89NOCdQWc8tzN7WpNBLeZsXDJ97w2NOD2qckBunXe4xSr71d3BPwX5c4n8rA__"
          alt="Profile"
          className={listScreenStyles.profile}
        />
      </div>
      <div className={listScreenStyles.content}>
        <span className={listScreenStyles.name}>Hi Mr. Michael,</span>
        <span className={listScreenStyles.title}>Welcome Back!</span>
        <span className={listScreenStyles.listTitle}>Our Products</span>

        <div className={listScreenStyles.list}>
          {list.length
            ? list?.map(item => {
                return (
                  <div
                    key={item.id}
                    tabIndex={0}
                    role="button"
                    className={listScreenStyles.product}
                    onKeyDown={() =>
                      navigateItem({id: item.id, brand: item.brand})
                    }
                    onClick={() => {
                      navigateItem({id: item.id, brand: item.brand});
                    }}
                  >
                    <span className={listScreenStyles.productName}>
                      {item.brand}
                    </span>
                    <img
                      className={listScreenStyles.productImage}
                      src={item.image}
                      alt={item.brand}
                    />

                    <span className={listScreenStyles.price}>
                      {(item.price / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                    {item.rating && (
                      <div className={listScreenStyles.evaluation}>
                        <Star />
                        <span>5</span>
                      </div>
                    )}

                    <button
                      className={listScreenStyles.addButton}
                      onClick={handleAddToCart}
                      aria-label="Added"
                      type="button"
                    >
                      <Plus />
                    </button>
                  </div>
                );
              })
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default ListScreen;
