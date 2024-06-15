import express from "express";
import Logger from "@src/logger";
import debugRouter from "@src/routers/debugRouter";

const app = express();
const port = 3000;

const logger = new Logger();
logger.setTag("index.ts");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(express.json());
app.use('/debug', debugRouter);

app.listen(port, () => {
    logger.info(`Server started! Listening on port ${port}`);
});
