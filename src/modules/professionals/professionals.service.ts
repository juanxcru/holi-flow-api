import { createDto, Professional, UpdateProfessionalDto } from "./professionals.types";
import { supabaseServiceRole} from "../../config/supabase";


 const getAll = async (orgId:string):Promise<Array<Professional>> => {

  const {data:professionals, error} = await supabaseServiceRole.from('professionals').select('*').eq('org_id', orgId);
  
  if(error){
      console.log(error);
      throw Error(`Error al intentar recuperar los profesionales: ${error.message}`);
    }
  
    if(!professionals){
      return new Array<Professional>();
    }
  
    return professionals as Array<Professional>;
}

 const getOneById = async (orgId:string, profId:string):Promise<Professional | null> => {

  const {data:professional, error} = await supabaseServiceRole.from('professionals').select().eq('org_id',orgId).eq('id',profId).single();

    if (error){
    if(error.code === 'PGRST116'){ //doesnt find match
      return null;
    }else {
      throw new Error (`Error trying to get one prof :  ${error.message} code: '${error.code}'`);
    }
  }
  
  if (!professional){ //should be an error
    console.log("Check supababse logs ")
    return null;
  }
  

  return professional;
}

 const create = async (orgId:string, dto:createDto):Promise<Professional> => {

    const newProf = {
      ...dto,
      org_id: orgId
    }
    
    const {data, error} = await supabaseServiceRole.from('professionals').insert(newProf).select().single();
  
    if (error || !data){
      throw new Error(`Error trying to create prof: ${error?.message || "can't retrieve new prof"}`);
    }
  
    return data as Professional;


}

 const deleteById = async (orgId:string, profId:string): Promise<boolean> => {
  
  const {error} = await supabaseServiceRole.from('professional').delete().eq('org_id',orgId).eq('id',profId).select('id').single();
  
  if (error){
    if(error.code === 'PGRST116'){ //doesnt find match
      return false;
    }else {
      throw new Error (`Error trying to get one prof for deletion :  ${error.message} code: '${error.code}'`);
    }
  }

  return true;

}

 const updateById = async (orgId:string, profId:string, dto:UpdateProfessionalDto): Promise<Professional | null> => {

  const {data, error} = await supabaseServiceRole.from('professionals').update(dto).eq('org_id', orgId).eq('id',profId).select().single();
  
    if (error){
      console.log(error);
      if(error.code === 'PGRST116'){ //doesnt find match or field names doesnt match
        return null;
      }else {
        throw new Error (`Error trying to get one prof for update :  ${error.message} code: '${error.code}'`);
      }
    }
  
    return data as Professional;
}


export default {
  getAll, getOneById, create, deleteById, updateById
}
