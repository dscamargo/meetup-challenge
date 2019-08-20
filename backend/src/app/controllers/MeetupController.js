import dateFns from "date-fns";
import { Meetup } from "../models";

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
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

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
}

export default new MeetupController();
