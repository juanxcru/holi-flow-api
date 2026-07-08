import { Request, Response } from "express";
import clientService from "./clients.service";
import { Client } from "./clients.types";
import * as zod from './clients.schemas'

const getAll =  async (req:Request, res:Response) => {

  try {
    
    const clients:Array<Client> = await clientService.getAll(req.user!.orgId);
    res.status(200).json(clients);

  } catch (error) {
    if(error instanceof Error){
      console.error(`Error al obtener clientes: ${error.message}`)
      res.status(500).json({message: "unexpected error"});
    }
  }

  return;

};

const getOneById = async (req:Request, res:Response) => {
  try {
    let clientId = req.params['id'] as string;
    
    if(!clientId){
      res.status(400).json({message: "No client id received"});
      return;
    }

    const client = await clientService.getOneById(req.user!.orgId, clientId);
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

const create = async (req:Request, res:Response) => {

  try {
    const bodyDtoValidation = zod.clientSchema.safeParse(req.body);

    if(!bodyDtoValidation.success){
      res.status(400).json({errors: bodyDtoValidation.error.issues});
      return;
    }

    const client:Client = await clientService.create(req.user!.orgId, bodyDtoValidation.data );
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

const deleteById = async (req:Request, res:Response) => {
  
  try{
    let clientId = req.params['id'] as string;
    
    if(!clientId){
      res.status(400).json({message: "No client id received"});
      return;
    }

    const result = await clientService.deleteById(req.user!.orgId, clientId);
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

const updateById =  async (req:Request, res:Response) => {
  
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

    const result = await clientService.updateById(req.user!.orgId, clientId , bodyDtoValidation.data);
    
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

export default {
  getAll, getOneById, create, updateById, deleteById
}

