import moment from "moment";
import { Op } from "sequelize";

import Queue from "../../lib/Queue";
import RegisterMail from "../jobs/RegisterMail";

import { User, Meetup, Register } from "../models";

moment.locale("pt-br");

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

    if (moment(new Date()).isAfter(meetup.date)) {
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

    const sameDate = userMeetups.find(m =>
      moment(m.meetup.date).isSame(meetup.date)
    );

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
        },
        {
          model: Meetup,
          as: "meetup",
          attributes: ["title", "description", "place", "date"]
        }
      ]
    });

    await Queue.add(RegisterMail.key, {
      to: meetup.user.email,
      user: meetup.user.username,
      title: registerData.meetup.title,
      description: registerData.meetup.description,
      place: registerData.meetup.place,
      date: moment(registerData.meetup.date).format("LLLL"),
      name: registerData.user.username,
      email: registerData.user.email
    });

    return res.status(201).json(register);
  }
  async index(req, res) {
    const registers = await Register.findAll({
      where: {
        user_id: req.userId
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "email"]
        },
        {
          model: Meetup,
          as: "meetup",
          include: [
            { model: User, as: "user", attributes: ["username", "email"] }
          ],
          attributes: ["id", "description", "title", "place", "date"],
          where: {
            date: {
              [Op.gte]: new Date()
            }
          }
        }
      ],
      order: [[{ model: Meetup, as: "meetup" }, "date", "ASC"]]
    });

    return res.status(200).json({ registers });
  }
}

export default new RegisterController();
