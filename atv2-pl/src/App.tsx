import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Clientes from './pages/Clientes/Clientes';
import Produtos from './pages/Produtos/Produtos';
import Servicos from './pages/Servicos/Servicos';
import Pets from './pages/Pets/Pets';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/pets" element={<Pets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
