import z from 'zod';


export const clientSchema = z.object({
  fullname: z.string() ,
  phone: z.string(),
  email: z.email(),
  birthdate: z.iso.date()
});

export const clientUpdateSchema = clientSchema.partial(); 

