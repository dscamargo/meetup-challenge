import dateFns, { startOfDay, endOfDay } from "date-fns";
import { Op } from "sequelize";
import { Meetup, User, File } from "../models";

class MeetupController {
  async store(req, res) {
    const { date } = req.body;

    if (dateFns.isAfter(new Date(), date))
      return res.status(401).json({
        status: "error",
        message: "It is not possible to make an appointment earlier than today"
      });

    const meetup = await Meetup.create({ ...req.body, user_id: req.userId });

    return res.status(201).json(meetup);
  }
  async index(req, res) {
    const { date, page = 1 } = req.query;
    let meetups;

    if (date) {
      meetups = await Meetup.findAll({
        where: {
          date: {
            [Op.between]: [startOfDay(date), endOfDay(date)]
          }
        },
        limit: 10,
        offset: 10 * page - 10,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "email"]
          },
          {
            model: File,
            as: "file",
            attributes: ["id", "title", "path"]
          }
        ]
      });
    } else {
      meetups = await Meetup.findAll({
        where: { user_id: req.userId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "username", "email"]
          },
          {
            model: File,
            as: "file",
            attributes: ["id", "title", "path"]
          }
        ]
      });
    }

    return res.status(200).json(meetups);
  }
  async update(req, res) {
    const { id } = req.params;

    let meetup = await Meetup.findByPk(id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        status: "error",
        message: "You are not the owner of this meetup"
      });
    }

    if (dateFns.isAfter(new Date(), meetup.date)) {
      return res.status(401).json({
        status: "error",
        message: "You cannot edit meetings that have already been held"
      });
    }

    meetup.update(req.body);

    return res.json(meetup);
  }
  async delete(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);

    if (dateFns.isAfter(new Date(), meetup.date)) {
      return res.status(401).json({
        status: "error",
        message: "You cannot remove meetings that have already been held."
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        status: "error",
        message: "You are not the owner of this meetup"
      });
    }

    await meetup.destroy({ force: true });

    return res.status(200).send();
  }
}

export default new MeetupController();
