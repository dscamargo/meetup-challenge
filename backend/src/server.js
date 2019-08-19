import express from "express";
import routes from "./routes";

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {}
  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
