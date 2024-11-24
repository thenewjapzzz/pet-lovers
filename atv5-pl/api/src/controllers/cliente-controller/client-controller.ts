import { RequestHandler } from "express";
import {
  createClientService,
  deleteClientService,
  getAllClientService,
  readClientService,
  updateClientService,
} from "../../services/client-service/client-service";

export const createClientController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { nome, nomeSocial, cpf, rg, telefone, empresa_id } = req.body;
    const newClient = await createClientService(
      nome,
      nomeSocial,
      cpf,
      rg,
      telefone,
      empresa_id
    );
    res.status(201).json(newClient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const readClientController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id } = req.params;
    const client = await readClientService(Number(id));
    if (!client) {
      res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllClientController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { empresa_id } = req.params;
    const clients = await getAllClientService(Number(empresa_id));
    res.status(200).json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClientController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedClient = await updateClientService(Number(id), updatedData);
    if (!updatedClient) {
      res.status(404).json({ error: "Cliente not found" });
    }
    res.status(200).json(updatedClient);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClientController: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteClientService(Number(id));
    if (!result) {
      res.status(404).json({ error: "Client not found" });
    }
    res.status(200).json({ message: "Client removed successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
