const api = require("./api/server");

const HOST = "localhost";
const PORT = 8888;

api.listen(PORT, () => console.log(`Server running at ${HOST}:${PORT}`));
