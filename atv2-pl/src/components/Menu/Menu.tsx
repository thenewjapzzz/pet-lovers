import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

class Menu extends Component<{ location: any }> {
  render() {
    const { location } = this.props;

    return (
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <FontAwesomeIcon icon={faPaw} size="2x" className="paw-icon" />
            PetLovers
          </div>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/clientes"
                className={`nav-link ${location.pathname === '/clientes' ? 'active' : ''}`}
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to="/produtos"
                className={`nav-link ${location.pathname === '/produtos' ? 'active' : ''}`}
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to="/servicos"
                className={`nav-link ${location.pathname === '/servicos' ? 'active' : ''}`}
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                to="/pets"
                className={`nav-link ${location.pathname === '/pets' ? 'active' : ''}`}
              >
                Pets
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// Componente funcional para fornecer a localização
const MenuWithRouter = (props: any) => {
  const location = useLocation();
  return <Menu {...props} location={location} />;
};

export default MenuWithRouter;
