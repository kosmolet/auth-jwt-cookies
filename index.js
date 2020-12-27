const connectToDB = require("./config/database");
const app = require("./server");

const PORT = process.env.PORT || 5090;

connectToDB();

app.listen(PORT, () => logger.debug(`Running on http://localhost:${PORT}`));
