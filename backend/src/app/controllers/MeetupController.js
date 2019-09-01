import dateFns, { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import { Meetup, User, File, Register } from '../models';

class MeetupController {
  async store(req, res) {
    const { date } = req.body;

    if (dateFns.isAfter(new Date(), date))
      return res.status(401).json({
        message:
          'Não é possível registrar um Meetup em uma data anterior a data de hoje',
      });

    const meetup = await Meetup.create({ ...req.body, user_id: req.userId });

    return res.status(201).json(meetup);
  }
  async show(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['title', 'path'],
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({
        message: 'Meetup não encontrado',
      });
    }

    return res.status(200).json(meetup);
  }
  async index(req, res) {
    const { date, page = 1 } = req.query;
    let meetups;
    let blacklist = [];

    const registers = await Register.findAll({
      where: { user_id: req.userId },
      attributes: ['meetup_id'],
    });

    registers.map(register => blacklist.push(register.meetup_id));

    if (date) {
      meetups = await Meetup.findAndCountAll({
        where: {
          id: {
            [Op.notIn]: blacklist,
          },
          user_id: { [Op.not]: req.userId },
          date: {
            [Op.between]: [startOfDay(date), endOfDay(date)],
          },
        },
        order: [['date', 'ASC']],
        limit: 10,
        offset: 10 * page - 10,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email'],
          },
          {
            model: File,
            as: 'file',
            attributes: ['id', 'title', 'path'],
          },
        ],
      });
    } else {
      meetups = await Meetup.findAndCountAll({
        where: {
          user_id: req.userId,
        },

        order: [['date', 'ASC']],

        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email'],
          },
          {
            model: File,
            as: 'file',
            attributes: ['id', 'title', 'path'],
          },
        ],
      });
    }

    return res.status(200).json(meetups);
  }
  async update(req, res) {
    const { id } = req.params;

    let meetup = await Meetup.findByPk(id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        message: 'Não é possível editar um Meetup que você não é o organizador',
      });
    }

    if (dateFns.isAfter(new Date(), meetup.date)) {
      return res.status(401).json({
        message: 'Não é possível editar um Meetup que já foi realizado',
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
        message: 'Não é possível excluir um Meetup que já foi realizado',
      });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({
        message:
          'Não é possível excluir um Meetup que você não é o organizador',
      });
    }

    await meetup.destroy({ force: true });

    return res.status(200).send();
  }
}

export default new MeetupController();
