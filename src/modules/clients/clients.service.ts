import {Client, CreateClientDto , UpdateClientDto}  from './clients.types'
import { supabaseServiceRole, supabase } from "../../config/supabase";

export const getAllClients =  async (orgId:string):Promise<Array<Client>> => {
    
  
  console.log("orgID:",orgId);
  
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


export const getClientById = async (orgId:string, id:string): Promise<Client> => {

return {
  email: " " ,
  birthdate: " " ,
  phone: " ",
  fullname: " ",
  id: " ",
  org_id: " "
}
}


export const createClient = async (orgId:string, dto:CreateClientDto): Promise<Client> => {

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