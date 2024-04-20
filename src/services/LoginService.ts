import GetAuthByEmailUseCase from "../use_cases/GetAuthByEmailUseCase";

export async function Login(data: { email: string; password: string }) {
  const getAuthByEmailUseCase = new GetAuthByEmailUseCase();
  const authdata = await getAuthByEmailUseCase.execute(data.email);

  if (!authdata) {
    throw new Error("Auth not found");
  }

  if (authdata?.password === data.password) {
    return authdata;
  } else {
    throw new Error("Invalid password");
  }
}
