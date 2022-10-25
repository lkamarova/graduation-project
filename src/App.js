import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavBarPage from './components/NavBarPage';
import PreloaderAllPage from './components/PreloaderAllPage';

function App() {
  useSelector((state) => state.shop.cart);
  const loading = useSelector(state => state.shop.loading)
  return (
    <div>
      {loading && <PreloaderAllPage />}
      <NavBarPage />
      <Outlet />
    </div>
  );
}

export default App;
