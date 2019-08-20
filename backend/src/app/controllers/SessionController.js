import jwt from "jsonwebtoken";
import * as Yup from "yup";

import { User } from "../models";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required()
    });
    const { email, password } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ status: "error", message: "Validation fails" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        status: "error",
        message: "Incorrect password"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_APP, {
      expiresIn: "2 days"
    });

    return res.status(201).json({ user, token });
  }
}

export default new SessionController();
