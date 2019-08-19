require("dotenv").config();
import server from "./server";

const port = process.env.PORT || 3333;
const host = process.env.HOST || "http://localhost";

server.listen(port, () => {
  console.log(`Server running on ${host}:${port}`);
});
