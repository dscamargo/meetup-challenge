import jwt from "jsonwebtoken";

module.exports = async (req, res, next) => {
  const { SECRET_APP } = process.env;

  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: "Access denied", message: "Token not provided" });
  }

  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(" ");

    try {
      const decoded = jwt.verify(token, SECRET_APP);

      req.userId = decoded.id;

      return next();
    } catch (err) {
      return res.status(401).json({ status: "error", message: err.message });
    }
  }
};
