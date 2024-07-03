import express from "express";
import Logger from "@src/logger";
import debugRouter from "@src/routers/debugRouter";
import metaRouter from "@src/routers/metaRouter";
import parentRouter from "@src/routers/parent";
import childRouter from "@src/routers/child";
import taskRouter from "@src/routers/task";
import logging from "./routers/middlewares/logging";
import responseLogging from "./routers/middlewares/responseLogging";
import os from "os";
import { getCommitHash, getCommitMessage } from "@utils/gitMeta";
import { Response, Request, Router } from 'express';
import prisma from '@src/prisma';
// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const port = 3000;

const logger = new Logger();
logger.setTag("index.ts");

// Greetings
console.log(`
      :::    ::: ::::::::::: :::::::::       ::::::::  :::    ::: ::::::::::: :::::::::: :::::::::::
     :+:   :+:      :+:     :+:    :+:     :+:    :+: :+:    :+:     :+:     :+:            :+:
    +:+  +:+       +:+     +:+    +:+     +:+        +:+    +:+     +:+     +:+            +:+
   +#++:++        +#+     +#+    +:+     +#++:++#++ +#++:++#++     +#+     :#::+::#       +#+
  +#+  +#+       +#+     +#+    +#+            +#+ +#+    +#+     +#+     +#+            +#+
 #+#   #+#      #+#     #+#    #+#     #+#    #+# #+#    #+#     #+#     #+#            #+#
###    ### ########### #########       ########  ###    ### ########### ###            ###`);

console.log("\n");
console.log("==Environment======================================================================================");

console.log("Environmnet:");
console.log("  System:");
console.log("    OS: " + os.type() + " " + os.release());
console.log("    CPU: " + os.cpus()[0].model + " x" + os.cpus().length);
console.log("    Memory: " + os.totalmem() / 1024 / 1024 / 1024 + " GB");
console.log("    Platform: " + os.platform());
console.log("  Software:");
console.log("    Node.js: " + process.versions.node);
console.log("    V8: " + process.versions.v8);
console.log("    CommitHash: " + await getCommitHash());
console.log("    CommitMessage: " + await getCommitMessage());
console.log("  Configuration:");
console.log("    DATABASE_URL: " + process.env.DATABASE_URL);

console.log("====================================================================================================");
console.log("\n");

logger.info("Starting server...");

app.use(express.json());
logger.info("JSON parser enabled");
app.use(logging);
logger.info("Logging middleware enabled");
logger.success("Configuration applied successfully");

// connect db
logger.info("Connecting to database...");
try {
    await prisma.$connect();
    // get db version with raw query
    const result = await prisma.$queryRaw`SELECT version()` as [{ version: string }];
    logger.success("Connected to database. version: " + result[0].version.split(" ").slice(0, 2).join(" "))
    logger.debug("raw: " + JSON.stringify(result));
} catch (e) {
    logger.error("Failed to connect to database");
    logger.debug("Error: " + e);
    process.exit(1);
}

app.get("/", (_req: Request, res: Response) => {
    res.status(200).sendFile("index.html", { root: "static" });
});
logger.info("Index page mounted");

const options = {
    swaggerDefinition: {
        info: {
            title: 'KidShift API',
            version: '1.0.0'
        },
    },
    apis: ['./src/routers/*.ts'],
};
const swaggerRouter = Router();
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerJSDoc(options)));
app.use('/docs', swaggerRouter);
logger.info("Swagger enabled and mounted at /docs");


app.use('/parent', responseLogging, parentRouter);
logger.debug("Parent router mounted at /parent");
app.use('/child', responseLogging, childRouter);
logger.debug("Child router mounted at /child");
app.use('/task', responseLogging, taskRouter);
logger.debug("Task router mounted at /task");
app.use('/debug', responseLogging, debugRouter); // TODO: NODE_ENVに応じてマウントをやめる
app.use('/meta', responseLogging, metaRouter);
logger.debug("Common routes mounted at /meta and /debug");
logger.success("Routers mounted successfully");


app.listen(port, () => {
    logger.complete(`Server started! Listening on port ${port}`);
});
