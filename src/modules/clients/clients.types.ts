export interface Client {

  id:string,
  org_id:string,
  fullname:string,
  phone:string,
  email:string,
  birthdate:string

}

export interface CreateClientDto {
  
  fullname:string,
  phone:string,
  email:string,
  birthdate:string
  
}

export type UpdateClientDto = Partial<CreateClientDto>;