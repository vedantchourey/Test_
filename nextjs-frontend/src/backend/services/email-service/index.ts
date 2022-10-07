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
  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, function (err, info) {
      console.warn("err => ", err);
      console.warn("info => ", info);
      resolve({ info, err });
    });
  });
};
