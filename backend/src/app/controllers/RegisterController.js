import { isAfter, isEqual } from "date-fns";

import Mail from "../../lib/Mail";
import { User, Meetup, Register } from "../models";

class RegisterController {
  async store(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"]
        }
      ]
    });

    if (!meetup) {
      return res
        .status(404)
        .json({ status: "error", message: "Meetup do not found" });
    }

    if (meetup.user_id === req.userId) {
      return res.status(401).json({
        status: "error",
        message: "You can not register in the meetup that you are the owner"
      });
    }

    if (isAfter(new Date(), meetup.date)) {
      return res.status(401).json({
        status: "error",
        message: "This meetup has passed"
      });
    }

    const isRegistered = await Register.findOne({
      where: { user_id: req.userId, meetup_id: id }
    });

    if (isRegistered) {
      return res.status(401).json({
        status: "error",
        message: "You already registered in this meetup"
      });
    }

    const userMeetups = await Register.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: "meetup"
        }
      ]
    });

    const sameDate = userMeetups.find(m => isEqual(m.meetup.date, meetup.date));

    if (sameDate) {
      return res.status(401).json({
        status: "error",
        message: "You can not register in various meetup in the same date"
      });
    }

    const register = await Register.create({
      user_id: req.userId,
      meetup_id: id
    });

    const registerData = await Register.findByPk(register.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email"]
        }
      ]
    });

    await Mail.sendMail({
      to: `${meetup.user.username} <${meetup.user.email}>`,
      subject: "Nova inscrição no seu Meetup",
      template: "cancelation",
      context: {
        user: meetup.user.username,
        name: registerData.user.username,
        email: registerData.user.email
      }
    });

    return res.status(201).json(register);
  }
}

export default new RegisterController();
