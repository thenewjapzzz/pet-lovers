import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faSignOut,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const getLinkClassNames = (path: string) => {
    return `text-black text-lg font-medium py-5 px-8 relative ${
      location.pathname === path
        ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
        : ""
    } transition-all`;
  };

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-black font-bold text-2xl">
          <FontAwesomeIcon icon={faPaw} size="2x" className="mr-3" />
          <span className="hidden lg:inline">PetLovers</span>
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        <ul className="hidden lg:flex space-x-8">
          <li>
            <Link to="/home" className={getLinkClassNames("/home")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/clientes" className={getLinkClassNames("/clientes")}>
              Clientes
            </Link>
          </li>
          <li>
            <Link to="/produtos" className={getLinkClassNames("/produtos")}>
              Produtos
            </Link>
          </li>
          <li>
            <Link to="/servicos" className={getLinkClassNames("/servicos")}>
              Serviços
            </Link>
          </li>
          <li>
            <Link to="/pets" className={getLinkClassNames("/pets")}>
              Pets
            </Link>
          </li>
          <li>
            <Link to="/listagem" className={getLinkClassNames("/listagem")}>
              Listagem
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link
            to="/pedido"
            className={`text-lg font-medium relative flex items-center ${
              location.pathname === "/pedido" ? "text-orange-500" : "text-black"
            }`}
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" className="mr-2" />
            Fazer pedido
          </Link>
          <Button
            onClick={handleLogOut}
            className="text-black text-lg font-medium relative flex items-center bg-white hover:bg-transparent"
          >
            <FontAwesomeIcon icon={faSignOut} size="lg" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          <Link
            to="/home"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/home" ? "text-orange-500" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/clientes"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/clientes" ? "text-orange-500" : ""
            }`}
          >
            Clientes
          </Link>
          <Link
            to="/produtos"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/produtos" ? "text-orange-500" : ""
            }`}
          >
            Produtos
          </Link>
          <Link
            to="/servicos"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/servicos" ? "text-orange-500" : ""
            }`}
          >
            Serviços
          </Link>
          <Link
            to="/pets"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/pets" ? "text-orange-500" : ""
            }`}
          >
            Pets
          </Link>
          <Link
            to="/listagem"
            className={`block text-black text-lg font-medium py-3 px-6 ${
              location.pathname === "/listagem" ? "text-orange-500" : ""
            }`}
          >
            Listagem
          </Link>
          <Button
            onClick={handleLogOut}
            className="block text-black text-lg font-medium py-1 px-6 bg-gray-300 hover:bg-transparent"
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Menu;
