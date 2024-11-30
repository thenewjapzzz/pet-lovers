import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-black font-bold text-2xl">
          <FontAwesomeIcon icon={faPaw} size="2x" className="mr-3" />
          PetLovers
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/home"
              className={`text-black text-lg font-medium py-5 px-8 relative ${
                location.pathname === "/home"
                  ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
                  : ""
              } transition-all`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/clientes"
              className={`text-black text-lg font-medium py-5 px-8 relative ${
                location.pathname === "/clientes"
                  ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
                  : ""
              } transition-all`}
            >
              Clientes
            </Link>
          </li>
          <li>
            <Link
              to="/produtos"
              className={`text-black text-lg font-medium py-5 px-8 relative ${
                location.pathname === "/produtos"
                  ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
                  : ""
              } transition-all`}
            >
              Produtos
            </Link>
          </li>
          <li>
            <Link
              to="/servicos"
              className={`text-black text-lg font-medium py-5 px-8 relative ${
                location.pathname === "/servicos"
                  ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
                  : ""
              } transition-all`}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link
              to="/pets"
              className={`text-black text-lg font-medium py-5 px-8 relative ${
                location.pathname === "/pets"
                  ? "after:w-3/4 after:h-0.5 after:bg-orange-400 after:mt-8 after:absolute after:left-1/2 after:transform after:-translate-x-1/2"
                  : ""
              } transition-all`}
            >
              Pets
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <li className="list-none">
            <Link
              to="/pedido"
              className={`text-black text-lg font-medium py-5 px-8 relative  ${
                location.pathname === "/pedido"
                  ? "text-orange-500"
                  : ""
              } transition-all`}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className="mr-2"
              />
              Fazer Pedido
            </Link>
          </li>
          <Button
            onClick={handleLogOut}
            className="text-black text-lg font-medium py-5 px-8 relative flex items-center bg-white hover:bg-transparent"
          >
            <FontAwesomeIcon icon={faSignOut} size="lg" className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
