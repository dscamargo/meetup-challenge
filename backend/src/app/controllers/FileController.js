import { File } from "../models";

class FileController {
  async store(req, res) {
    const { filename: path, originalname: title } = req.file;
    const file = await File.create({
      title,
      path
    });

    return res.json(file);
  }
}

export default new FileController();
