import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/login';
import Home from './pages/home/home';
import ClientPage from './pages/client/client';
import ProductPage from './pages/products/products';
import ServicePage from './pages/services/services';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
      <Routes>
        <Route path='/clientes' element={<ClientPage />} />
      </Routes>
      <Routes>
        <Route path='/produtos' element={<ProductPage />} />
      </Routes>
      <Routes>
        <Route path='/servicos' element={<ServicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
