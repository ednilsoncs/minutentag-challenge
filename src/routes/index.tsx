import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductsScreen from '../modules/Products/ListScreen';
import ProductDetailScreen from '../modules/Products/DetailScreen';

function Navigate(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/product/:id" element={<ProductDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigate;
