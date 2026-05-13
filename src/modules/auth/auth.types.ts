export interface RegisterDto {
  email:string,
  password:string,
  organizationName: string,
  country:string,
  timezone:string,
  defaultProfessionalFee:number,
  adminName:string,
  adminPhone:string
}

export interface LoginDto {
  email:string,
  password:string,
}

export interface AuthResponse {
  token: string
  organization: {
    id: string
    name: string
  }
  user: {
    id: string
    email: string
    name: string
  }
  
}