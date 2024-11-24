import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Cliente } from "../entity/client-model";
import { Servico } from "../entity/service-model";
import { Produto } from "../entity/product-model";
import { Pet } from "../entity/pet-model";
import { Pedido } from "../entity/order-model";
import { Empresa } from "../entity/company-model";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Empresa, Cliente, Servico, Produto, Pet, Pedido],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialize");
  })
  .catch((error) => console.log(error));
