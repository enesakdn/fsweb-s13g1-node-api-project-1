// express modülünü import edin:
const server = require("./api/users/server");

const port = 9000;

server.listen(port, () => {
  console.log("Server is listening on " + port);
});
