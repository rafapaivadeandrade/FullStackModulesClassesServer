const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const apiErrorHandler = require('./errors/handler');

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(apiErrorHandler);

app.listen(3333);
