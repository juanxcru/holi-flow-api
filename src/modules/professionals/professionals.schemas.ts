import z from 'zod';


export const professionalSchema = z.object({
  name: z.string() ,
  email: z.email(),
  phonenumber: z.string(),
  role: z.string(),
  active: z.boolean(),
  commision_override: z.number().optional()

});

export const professionalUpdateSchema = professionalSchema.partial(); 

