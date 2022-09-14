import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";
import { ISessionsResquest } from "../../interfaces/sessions/sessions";
import "dotenv/config";
import { AccessLog } from "../../entities/accessLog.entitys";
import { compare } from "bcryptjs";
import JWT from "jsonwebtoken";

const sessionsCreateService = async ({
  cpf,
  password,
}: ISessionsResquest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const acceslog = AppDataSource.getRepository(AccessLog);

  const user = await userRepository.findOneBy({ cpf: cpf });
  if (!user) {
    throw new AppError("Invalid CPF or passwor", 403);
  }
  const userPassword = await compare(password, user.password);
  if (!userPassword) {
    throw new AppError("Invalid CPF or password", 403);
  }
  const newAcceslog = acceslog.create({
    user: user,
  });
  await acceslog.save(newAcceslog);
  const token = JWT.sign(
    {
      administrationNivel: user.administrationNivel,
      emailAdm: user.email,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );
  return token;
};
export default sessionsCreateService;
