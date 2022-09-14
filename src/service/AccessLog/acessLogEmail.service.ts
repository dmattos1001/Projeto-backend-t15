import AppDataSource from "../../data.source";
import { AccessLog } from "../../entities/accessLog.entitys";
import { IAccessLog } from "../../interfaces/acessLog/accesLog";
import "dotenv/config";
import { User } from "../../entities/user.entitys";

import { sendEmail } from "../../sendEmail/nodemailer.util";
import { AppError } from "../../errors/AppErros";
import { string } from "yup";
const acessLogEmailService = async ({ id, data, email }: IAccessLog) => {
  const accessLogRepository = AppDataSource.getRepository(AccessLog);
  const userRepository = AppDataSource.getRepository(User);
  const accessLog = await accessLogRepository.find();
  if (id) {
    const user = await userRepository.findOneBy({ id: id });
    if (!user) {
      throw new AppError("invalid Id");
    }
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
    await sendEmail({
      subject: "Access Log",
      text: { ...accessLogRepositoryId },
      to: process.env.SMTP_USER || "admestoquehardware@outlook.com",
      template: "index",
    });
    return `Log email sent successfully`;
  }

  if (email) {
    const userEmail = await userRepository.findOneBy({ email: email });
    if (!userEmail) {
      throw new AppError("invalid Email");
    }
    const accessLogRepositoryId = accessLog.map((element) => {
      if (element.user.email === email) {
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
    await sendEmail({
      subject: "Access Log",
      text: { ...accessLogRepositoryId },
      to: process.env.SMTP_USER || "admestoquehardware@outlook.com",
      template: "index",
    });
    return `Log email sent successfully`;
  }

  if (data) {
    const datas = data.split("/").reverse().join("-");
    const accessDate = await accessLogRepository.find({
      where: { accessDate: datas },
    });
    const accessLogRepositoryId = accessDate.map((element) => {
      if (element.accessDate === accessDate[0].accessDate) {
        const log = {
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

    if (accessLogRepositoryId.toString() === "") {
      throw new AppError("invalid Date", 400);
    }

    console.log(accessLogRepositoryId);
    await sendEmail({
      subject: "Access Log",
      text: { ...accessLogRepositoryId },
      to: process.env.SMTP_USER || "admestoquehardware@outlook.com",
      template: "index",
    });
    return `Log email sent successfully`;
  }
  throw new AppError("the user id, email, date must be passed", 404);
};
export default acessLogEmailService;
