import { Outlet } from 'react-router-dom';
import './App.css';
import NavBarPage from './components/NavBarPage';

function App() {
  return (
    <div>
      <NavBarPage />
      <Outlet />
    </div>
  );
}

export default App;
