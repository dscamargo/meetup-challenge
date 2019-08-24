import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import { User } from '../models/';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });
    const { username, email, password } = req.body;

    if (!(await schema.isValid(req.body)))
      return res
        .status(400)
        .json({ status: 'error', message: 'Validation fails' });

    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res
        .status(401)
        .json({ status: 'error', message: 'User already exists' });

    const user = await User.create({ username, email, password });

    return res.status(201).json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      email: Yup.string().email(),
      password_old: Yup.string().min(6),
      password: Yup.string().when('password_old', (oldPassword, field) =>
        oldPassword ? field.min(6).required() : field
      ),
      password_confirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    const { id } = req.params;
    const { password_old, password } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Validation fails' });
    }

    const user = await User.findByPk(id);

    if (!user)
      res.status(404).json({ status: 'error', message: 'User not found' });

    if (password_old) {
      const isCorrect = await bcrypt.compare(password_old, user.password_hash);

      if (!isCorrect)
        return res
          .status(401)
          .json({ status: 'error', message: 'Incorrect old password' });

      user.password = password;

      user.save();
    }

    return res.status(200).json(user);
  }
}

export default new UserController();
