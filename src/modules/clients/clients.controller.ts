import { Request, Response } from "express";
import clientService from "./clients.service";
import { Client } from "./clients.types";
import * as zod from './clients.schemas'

const getAll = async (req: Request, res: Response) => {
  const clients: Array<Client> = await clientService.getAll(req.user!.accessToken);
  res.status(200).json(clients);
};

const getOneById = async (req: Request, res: Response) => {
  const clientId = req.params['id'] as string;

  if (!clientId) {
    res.status(400).json({ message: "No client id received" });
    return;
  }

  const client = await clientService.getOneById(req.user!.orgId, clientId);
  if (client)
    res.status(200).json(client);
  else
    res.status(404).json({ message: 'client doesnt exist' });
};

const create = async (req: Request, res: Response) => {
  const bodyDtoValidation = zod.clientSchema.safeParse(req.body);

  if (!bodyDtoValidation.success) {
    res.status(400).json({ errors: bodyDtoValidation.error.issues });
    return;
  }

  const client: Client = await clientService.create(req.user!.orgId, bodyDtoValidation.data);
  res.status(201).json(client);
};

const deleteById = async (req: Request, res: Response) => {
  const clientId = req.params['id'] as string;

  if (!clientId) {
    res.status(400).json({ message: "No client id received" });
    return;
  }

  const result = await clientService.deleteById(req.user!.orgId, clientId);
  if (result)
    res.status(200).json({ message: 'deleted succesfully' })
  else
    res.status(404).json({ message: 'client doesnt exist' })
};

const updateById = async (req: Request, res: Response) => {
  const bodyDtoValidation = zod.clientUpdateSchema.safeParse(req.body);

  if (!bodyDtoValidation.success) {
    res.status(400).json({ errors: bodyDtoValidation.error.issues });
    return;
  }

  const clientId = req.params['id'] as string;

  if (!clientId) {
    res.status(400).json({ message: "No client id received" });
    return;
  }

  const result = await clientService.updateById(req.user!.orgId, clientId, bodyDtoValidation.data);

  if (result)
    res.status(200).json(result)
  else
    res.status(404).json({ message: 'client doesnt exist' })
};

export default {
  getAll, getOneById, create, updateById, deleteById
}