import { Router } from "express";
import { login } from "./auth/controllers/auth-controller";
import {
  createClientController,
  deleteClientController,
  getAllClientController,
  readClientController,
  updateClientController,
} from "./controllers/cliente-controller/client-controller";
import { createProductController, deleteProductController, getAllProductController, readProductController, updateProductController } from "controllers/product-controller/product-controller";
import { createServiceController, deleteServiceController, getAllServiceController, readServiceController, updatedServiceController } from "controllers/service-controller/service-controller";
import { createPetContoller, deletePetController, getAllPetsByClientController, readPetController, updatePetController } from "controllers/pet-controller/pet-controller";

const router = Router();

// Rota de login
router.post("/", login);

// Rotas do cliente
router.post("/create-client", createClientController);
router.get("/client/:id", readClientController);
router.get("/client/empresa/:empresa_id", getAllClientController);
router.put("/client/:id", updateClientController);
router.delete("/client/:id", deleteClientController);

// Rotas do produto
router.post("/create-product", createProductController);
router.get("/product/:id", readProductController);
router.get("/product/empresa/:empresa_id", getAllProductController);
router.put("/product/:id", updateProductController);
router.delete("/product/:id", deleteProductController);

// Rotas do serviço
router.post("/create-service", createServiceController);
router.get("/service/:id", readServiceController);
router.get("/service/empresa/:empresa_id", getAllServiceController);
router.put("/service/:id", updatedServiceController);
router.delete("/service/:id", deleteServiceController);

// Rotas para pet
router.post("/create-pet", createPetContoller);
router.get("/pets/:id", readPetController);
router.get("/pets/client/:client_id", getAllPetsByClientController)
router.put("/pet/:id", updatePetController);
router.delete("/pet/:id", deletePetController);

export default router;
