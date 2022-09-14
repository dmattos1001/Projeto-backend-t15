import AppDataSource from "../../data.source";
import { AccessLog } from "../../entities/accessLog.entitys";
import { IAccessLog } from "../../interfaces/acessLog/accesLog";
import { sendEmail } from "../../sendEmail/nodemailer.util";
import "dotenv/config";
import { User } from "../../entities/user.entitys";
const acessLogEmailService = async ({ id, data, email }: IAccessLog) => {
  const accessLogRepository = AppDataSource.getRepository(AccessLog);
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneByOrFail({ id: id });
  const accessLog = await accessLogRepository.find();
  if (user) {
    const accessLogRepositoryId = accessLog.map((element) => {
      if (element.user.id === id) {
        let log = {
          accessId: element.id,
          accessDate: element.accessDate,
          name: element.user.name,
          cpf: element.user.cpf,
          email: element.user.email,
          cell: element.user.cell,
          administrationNivel: element.user.administrationNivel,
        };
        return log;
      }
    });
    const test = JSON.stringify(accessLogRepositoryId);
    const testado = JSON.parse(test);
    const resultado = (testado.innerHTML =
      "AccessId: " +
      testado.accessId +
      "<br>accessDate: " +
      testado.accessDate +
      "<br>name: " +
      testado.name +
      "<br>cpf:" +
      testado.cpf +
      "<br>email" +
      testado.email +
      "<br>cell" +
      testado.cell +
      "<br>:administrationNivel" +
      testado.administrationNivel);
    console.log(resultado);
    // await sendEmail({
    //   subject: "Access Log",
    //   text: JSON.stringify(accessLogRepositoryId),
    //   to: process.env.SMTP_USER || "admestoquehardware@outlook.com",
    // });
    return `email sent with  access logs`;
  }
  return "email sent with tos log";
};
export default acessLogEmailService;
