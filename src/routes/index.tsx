import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ProductsScreen from '../modules/Products/ListScreen';
import ProductDetailScreen from '../modules/Products/DetailScreen';

function NavigateAppRouters(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsScreen />} />
        <Route
          path="/product/:productIdentifier"
          element={<ProductDetailScreen />}
        />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavigateAppRouters;
