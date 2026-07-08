import { Request, Response } from "express";
import { Professional } from "./professionals.types";
import professionalService from "./professionals.service";
import * as zod from './professionals.schemas'



const getAll = async (req:Request, res:Response) => {

  try {

    const professionals:Array<Professional> = await professionalService.getAll(req.user!.orgId);
    res.status(200).json(professionals);
    
  } catch (error) {
    if(error instanceof Error){
      console.error(`Error al obtener profesionales: ${error.message}`)
      res.status(500).json({message: "unexpected error"});
    }
  }

  return;

}

const getOneById = async (req:Request, res:Response) => {

  try {

    let profId = req.params['id'] as string;
    
    if(!profId){
      res.status(400).json({message: "No prof id received"});
      return;
    }

    const professional = await professionalService.getOneById(req.user!.orgId, profId);

    if(professional)
      res.status(200).json(professional);
    else
      res.status(404).json({message: 'professional doesnt exists'});
    
  } catch (error) {

    if (error instanceof Error){
      console.error(`Error trying to get prof by id: ${error.message}`)
      res.status(500).json({message: error.message});
    }else{
      console.error("UNEXPECTED ERROR ", error);
      res.status(500).json({message: "unexpected error"});
    }
    
  }

}

const create = async (req:Request, res:Response) => {
  try {
      const bodyDtoValidation = zod.professionalSchema.safeParse(req.body);
  
      if(!bodyDtoValidation.success){
        res.status(400).json({errors: bodyDtoValidation.error.issues});
        return;
      }
  
      const professional:Professional = await professionalService.create(req.user!.orgId, bodyDtoValidation.data );
      res.status(201).json(professional);
      
    } catch (error) {
      
      if(error instanceof Error){
        console.error(`Error trying to create a prof: ${error.message}`)
        res.status(500).json({message: error.message});
      }else{
        console.error("UNEXPECTED ERROR ", error);
        res.status(500).json({message: "unexpected error"});
      }
  
    }
  
    return;
}

const updateById = async (req:Request, res:Response) => {
  try{
      const bodyDtoValidation = zod.professionalUpdateSchema.safeParse(req.body);
  
      if(!bodyDtoValidation.success){
        res.status(400).json({message: bodyDtoValidation.error.issues });
        return;
      }
  
      const professionalId = req.params['id'] as string;
      
      if(!professionalId){
        res.status(400).json({message: "No professional id received"});
        return;
      }
  
      const result = await professionalService.updateById(req.user!.orgId, professionalId , bodyDtoValidation.data);
      
      if(result)
        res.status(200).json(result)
      else  
        res.status(404).json({message: 'user doesnt exist'})
  
  
    }catch(error){
      if(error instanceof Error){
       console.error(`Error trying to update a professional: ${error.message}`)
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
      let professionalId = req.params['id'] as string;
      
      if(!professionalId){
        res.status(400).json({message: "No professional id received"});
        return;
      }
  
      const result = await professionalService.deleteById(req.user!.orgId, professionalId);
      if(result)
        res.status(200).json({message: 'deleted succesfully'})
      else  
        res.status(404).json({message: 'professional doesnt exist'})
  
    }catch(error){
      if(error instanceof Error){
       console.error(`Error trying to delete a professional: ${error.message}`)
        res.status(500).json({message: error.message});
      }else{
        console.error("UNEXPECTED ERROR ", error);
        res.status(500).json({message: "unexpected error"});
      }
    }
}


export default {
  getAll, getOneById, create, updateById, deleteById
}