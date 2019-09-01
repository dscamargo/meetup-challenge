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
        .json({ message: 'Erro da validação na entrada de dados' });

    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      return res.status(401).json({ message: 'Usuário já existe' });

    const user = await User.create({ username, email, password });

    return res.status(201).json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password_old: Yup.string().min(6),
      password: Yup.string().when('password_old', (oldPassword, field) =>
        oldPassword ? field.min(6).required() : field
      ),
      password_confirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const { username, email, password_old, password } = req.body;

    if (!(await schema.isValid(req.body)))
      return res
        .status(400)
        .json({ message: 'Erro da validação na entrada de dados' });

    const user = await User.findByPk(req.userId);

    if (password_old) {
      const isCorrect = await bcrypt.compare(password_old, user.password_hash);

      if (!isCorrect) {
        return res.status(401).json({ message: 'Senha antiga incorreta' });
      }

      user.password = password;
    }

    user.username = username;
    user.email = email;

    await user.save();

    return res.status(200).json(user);
  }
}

export default new UserController();
