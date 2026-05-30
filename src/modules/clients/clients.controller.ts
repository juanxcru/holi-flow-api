import { Request, Response } from "express";
import { createClient, deleteClientById, getAllClients, getClientById, updateClientById } from "./clients.service";
import { Client } from "./clients.types";
import * as zod from './clients.schemas'

export const getAllClientsController =  async (req:Request, res:Response) => {

  try {
    
    const clients:Array<Client> = await getAllClients(req.user!.orgId);
    res.status(200).json(clients);

  } catch (error) {
    if(error instanceof Error){
      console.error(`Error al obtener clientes: ${error.message}`)
      res.status(500).json({message: "unexpected error"});
    }
  }

  return;

};

export const getClientByIdController = async (req:Request, res:Response) => {
  try {
    let clientId = req.params['id'] as string;
    
    if(!clientId){
      res.status(400).json({message: "No client id received"});
      return;
    }

    const client = await getClientById(req.user!.orgId, clientId);
    if(client)
      res.status(200).json(client);
    else
      res.status(404).json({message: 'client doesnt exist'})
    
  } catch (error) {
    if(error instanceof Error){
      console.error(`Error trying to get client by id: ${error.message}`)
      res.status(500).json({message: error.message});
    }else{
      console.error("UNEXPECTED ERROR ", error);
      res.status(500).json({message: "unexpected error"});
    }
  }

  return;

}

export const createClientController = async (req:Request, res:Response) => {

  try {
    const bodyDtoValidation = zod.clientSchema.safeParse(req.body);

    if(!bodyDtoValidation.success){
      res.status(400).json({errors: bodyDtoValidation.error.issues});
      return;
    }

    const client:Client = await createClient(req.user!.orgId, bodyDtoValidation.data );
    res.status(201).json(client);
    
  } catch (error) {
    
    if(error instanceof Error){
      console.error(`Error trying to create a client: ${error.message}`)
      res.status(500).json({message: error.message});
    }else{
      console.error("UNEXPECTED ERROR ", error);
      res.status(500).json({message: "unexpected error"});
    }

  }

  return;



}

export const deleteClientByIdController = async (req:Request, res:Response) => {
  
  try{
    let clientId = req.params['id'] as string;
    
    if(!clientId){
      res.status(400).json({message: "No client id received"});
      return;
    }

    const result = await deleteClientById(req.user!.orgId, clientId);
    if(result)
      res.status(200).json({message: 'deleted succesfully'})
    else  
      res.status(404).json({message: 'client doesnt exist'})

  }catch(error){
    if(error instanceof Error){
     console.error(`Error trying to delete a client: ${error.message}`)
      res.status(500).json({message: error.message});
    }else{
      console.error("UNEXPECTED ERROR ", error);
      res.status(500).json({message: "unexpected error"});
    }
  }

    
}

export const updateClientByIdController =  async (req:Request, res:Response) => {
  
  try{
    const bodyDtoValidation = zod.clientUpdateSchema.safeParse(req.body);

    if(!bodyDtoValidation.success){
      res.status(400).json({message: bodyDtoValidation.error.issues });
      return;
    }

    const clientId = req.params['id'] as string;
    
    if(!clientId){
      res.status(400).json({message: "No client id received"});
      return;
    }

    const result = await updateClientById(req.user!.orgId, clientId , bodyDtoValidation.data);
    
    if(result)
      res.status(200).json(result)
    else  
      res.status(404).json({message: 'user doesnt exist'})


  }catch(error){
    if(error instanceof Error){
     console.error(`Error trying to update a client: ${error.message}`)
      res.status(500).json({message: error.message});
    }else{
      console.error("UNEXPECTED ERROR ", error);
      res.status(500).json({message: "unexpected error"});
    }
  }

    return;
}