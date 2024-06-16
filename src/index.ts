import express from "express";
import Logger from "@src/logger";
import debugRouter from "@src/routers/debugRouter";
import path from "path";

const app = express();
const port = 3000;

const logger = new Logger();
logger.setTag("index.ts");

app.get("/", (req, res) => {
    res.status(200).sendFile("index.html", { root: "static" });
});

app.use(express.json());
app.use('/debug', debugRouter);

app.listen(port, () => {
    logger.info(`Server started! Listening on port ${port}`);
});
