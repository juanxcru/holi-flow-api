import AuthException from "./auth.exceptions";
import { supabaseServiceRole, supabase } from "../../config/supabase";
import { RegisterDto, LoginDto, AuthResponse } from "./auth.types";

export const register = async (dto: RegisterDto): Promise<AuthResponse> => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: dto.email,
    password: dto.password,
  });

  if (!authData.session || authError) {
    console.error(authError);
    throw new AuthException(authError?.message || "Error al crear cuenta", 401 );
  }

  const { data: orgData, error: insertError } = await supabaseServiceRole
    .from("organizations")
    .insert({
      name: dto.organizationName,
      country: dto.country,
      timezone: dto.timezone,
      admin_name: dto.adminName,
      admin_email: dto.email,
    })
    .select()
    .single();

  if (insertError) {
    await supabaseServiceRole.auth.admin.deleteUser(authData.user!.id);
    console.error(insertError);
    throw new AuthException(
      `Error al crear organization: ${insertError.message}, ${insertError.name}`, 403
    );
  }

  const { error: orgMemberError } = await supabaseServiceRole
    .from("organization_members")
    .insert({
      org_id: orgData.id,
      user_id: authData.user!.id,
      role: "owner",
    })
    .select()
    .single();

  if (orgMemberError) {
    await supabaseServiceRole.auth.admin.deleteUser(authData.user!.id);
    await supabaseServiceRole.from("organizations").delete().eq("id", orgData.id);
    throw new AuthException(
      `Error al crear organization_users: ${orgMemberError.message}, ${orgMemberError.name}`, 403
    );
  }

  console.log(orgData);

  return {
    token: authData.session.access_token,
    organization: {
      id: orgData.id,
      name: orgData.name,
    },
    user: {
      id: authData.user!.id,
      email: authData.user!.email!,
      name: orgData.admin_name,
    },
  };
};

export const login = async (dto: LoginDto): Promise<AuthResponse> => {

  const {data: signInData, error: signInError} = await supabase.auth.signInWithPassword({
    email: dto.email,
    password: dto.password
  })

  if(signInError){
    console.error(signInError);
    throw new AuthException(
      `Error al intentar login: ${signInError.message}, ${signInError.name}`, 401
    );

  }
  console.log(signInData.user!.id)
  const {data:orgMemberData, error: orgMemberError} = await supabaseServiceRole.from('organization_members').select(`id, org_id , organizations(name, admin_name )`).eq('user_id', signInData.user!.id).single() as any;

  if(orgMemberError){
    console.error(orgMemberError)
    throw new AuthException(
      `Error al intentar obtener info de organizacion: ${orgMemberError.message}, ${orgMemberError.name}`, 500
    );
  }

  return {
    token: signInData.session.access_token,
    organization: {
      id: orgMemberData!.org_id,
      name: orgMemberData!.organizations.name,
    },
    user: {
      id: signInData.user!.id,
      email: signInData.user!.email!,
      name: orgMemberData!.organizations.admin_name,
    },
  };


};
