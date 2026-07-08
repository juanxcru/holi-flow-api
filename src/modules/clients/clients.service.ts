import {Client, createDto , UpdateClientDto}  from './clients.types'
import { supabaseServiceRole, supabase } from "../../config/supabase";

const getAll =  async (orgId:string):Promise<Array<Client>> => {
    
    
  const {data:clients, error} = await supabaseServiceRole.from('clients').select('*').eq('org_id', orgId);
  
  if(error){
    console.log(error);
    throw Error(`Error al intentar recuperar los clients: ${error.message}`);
  }

  if(!clients){
    return new Array<Client>();
  }

  return clients as Array<Client>;
  
}


const getOneById = async (orgId:string, userId:string): Promise<Client | null> => {

  const {data:client, error } = await supabaseServiceRole.from('clients').select().eq('org_id', orgId).eq('id', userId).single();
  
  if (error){
    if(error.code === 'PGRST116'){ //doesnt find match
      return null;
    }else {
      throw new Error (`Error trying to get one client :  ${error.message} code: '${error.code}'`);
    }
  }
  
  if (!client){ //should be an error
    console.log("Check supababse logs ")
    return null;
  }
  

  return client;

}


const create = async (orgId:string, dto:createDto): Promise<Client> => {

  const newClient = {
    ...dto,
    org_id: orgId
  }
  
  const {data, error} = await supabaseServiceRole.from('clients').insert(newClient).select().single();

  if (error || !data){
    throw new Error(`Error trying to create client: ${error?.message || "can't retrieve new client"}`);
  }

  return data as Client;


}

const deleteById = async (orgId:string, userId:string): Promise<boolean> => {

  const {error} = await supabaseServiceRole.from('clients').delete().eq('org_id',orgId).eq('id',userId).select('id').single();
  
  if (error){
    if(error.code === 'PGRST116'){ //doesnt find match
      return false;
    }else {
      throw new Error (`Error trying to get one client for deletion :  ${error.message} code: '${error.code}'`);
    }
  }

  return true;
}

const updateById = async (orgId:string, userId:string, dto:UpdateClientDto): Promise<Client|null> => {

  const {data, error} = await supabaseServiceRole.from('clients').update(dto).eq('org_id', orgId).eq('id',userId).select().single();

  if (error){
    console.log(error);
    if(error.code === 'PGRST116'){ //doesnt find match or field names doesnt match
      return null;
    }else {
      throw new Error (`Error trying to get one client :  ${error.message} code: '${error.code}'`);
    }
  }

  return data as Client;
}


export default {
  getAll, getOneById, create, updateById, deleteById
}