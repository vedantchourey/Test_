import nodemailer, { SendMailOptions } from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  secure: true,
  port: 465,
  auth: {
    user: "dev@noobstorm.gg",
    pass: "C0desymoh0ny",
  },
});



export const sendEmail = async (mailOptions: SendMailOptions): Promise<any> => {
  return await transporter.sendMail(mailOptions, function (err, info) {
    console.info("err => ", err);
    console.info("info => ", info);
    return { info, err }
  });
};
