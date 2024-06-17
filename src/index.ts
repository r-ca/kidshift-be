import express from "express";
import Logger from "@src/logger";
import debugRouter from "@src/routers/debugRouter";
import os from "os";
import { getCommitHash, getCommitMessage } from "@utils/gitMeta";
import authRouter from "@src/routers/authRouter";
import taskRouter from "@src/routers/taskRouter";
import metaRouter from "@src/routers/metaRouter";
import { Response, Request } from 'express';
// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const port = 3000;

const logger = new Logger();
logger.setTag("index.ts");

// Greetings
console.log(`
      :::    ::: ::::::::::: :::::::::       ::::::::   :::    ::: ::::::::::: :::::::::: :::::::::::
     :+:   :+:      :+:     :+:    :+:     :+:    :+:  :+:    :+:     :+:     :+:            :+:
    +:+  +:+       +:+     +:+    +:+     +:+         +:+    +:+     +:+     +:+            +:+
   +#++:++        +#+     +#+    +:+     +#++:++#++  +#++:++#++     +#+     :#::+::#       +#+
  +#+  +#+       +#+     +#+    +#+            +#+  +#+    +#+     +#+     +#+            +#+
 #+#   #+#      #+#     #+#    #+#     #+#    #+#  #+#    #+#     #+#     #+#            #+#
###    ### ########### #########       ########   ###    ### ########### ###            ###`);

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
console.log("    Port: " + port);

console.log("====================================================================================================");
console.log("\n");

logger.info("Starting server...");

app.get("/", (_req: Request, res: Response) => {
    res.status(200).sendFile("index.html", { root: "static" });
});

const options = {
    swaggerDefinition: {
        info: {
            title: 'KidShift API',
            version: '1.0.0'
        },
    },
    apis: ['./src/routers/*.ts'],
};
app.get('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.use(express.json());
logger.info("JSON parser enabled");

app.use('/debug', debugRouter);
app.use('/auth', authRouter);
app.use('/task', taskRouter);
app.use('/meta', metaRouter);
logger.info("Routers mounted");

app.listen(port, () => {
    logger.info(`Server started! Listening on port ${port}`);
});
