import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Example from './pages/Clients/Clientes';
import Produtos from './pages/Products/Produtos';
import Servico from './pages/Services/Servicos';
import PetManagement from './pages/Pets/Pets';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Example />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/servicos" element={<Servico />} />
          <Route path="/pets" element={<PetManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
