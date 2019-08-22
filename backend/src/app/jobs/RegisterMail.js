require("dotenv").config();
import Mail from "../../lib/Mail";

class RegisterMail {
  get key() {
    return "RegisterMail";
  }
  async handle({ data }) {
    const { to, user, title, description, place, date, name, email } = data;

    await Mail.sendMail({
      to: `${user} <${to}>`,
      subject: "Nova inscrição no seu Meetup",
      template: "newRegister",
      context: {
        user,

        title,
        description,
        place,
        date,

        name,
        email
      }
    });
  }
}

export default new RegisterMail();
