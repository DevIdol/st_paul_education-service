import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "url";

export const verifyEmail = async (email, subject, text) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        var transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.MAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: "st.paul.education.service@gmail.com",
                pass: "qvxhhkrcqjorhvly",
            },
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve(__dirname, "../view"),
                defaultLayout: false,
            },
            viewPath: path.resolve(__dirname, "../view"),
            extName: ".handlebars",
        };

        transporter.use("compile", hbs(handlebarOptions));

        var mailOptions = {
            from: `St.Paul's Education Service🎓 <${process.env.USER}>`,
            to: email,
            subject: subject,
            template: "verifyemail",
            context: {
                title: "St.Paul's Education Service Account",
                text: text,
            },
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.log(`Email couldn't sent!`);
        console.log(error);
    }
};
