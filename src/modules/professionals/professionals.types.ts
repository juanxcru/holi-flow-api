export interface Professional {
  id: string,
  org_id: string,
  name: string, 
  email: string,
  phonenumber: string,
  role: string
  active: boolean
  commision_override?: number
}


export interface createDto {

  name: string, 
  role: string,
  email: string,
  phonenumber: string,
  active: boolean
  commision_override?: number

}

export type UpdateProfessionalDto = Partial<createDto>;