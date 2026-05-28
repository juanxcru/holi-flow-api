export interface Client {

  id:string,
  orgId:string,
  fullName:string,
  phone:string,
  email:string,
  birthdate:string

}

export interface UpdateClientDto {
  fullName:string,
  phone:string,
  email:string,
  birthdate:string
}

export interface CreateClientDto {
  
  fullName:string,
  phone:string,
  email:string,
  birthdate:string

}