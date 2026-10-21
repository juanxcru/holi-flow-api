export interface Client {

  id:string,
  org_id:string,
  full_name:string,
  phone:string,
  email:string,
  birthdate:string

}

export interface createDto {
  
  full_name:string,
  phone:string,
  email:string,
  birthdate:string
  
}

export type UpdateClientDto = Partial<createDto>;