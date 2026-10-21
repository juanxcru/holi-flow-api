import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        orgId: string
        roles: string[]
        accessToken: string
      }
    }
  }
}

export default Request;