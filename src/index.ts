import express from "express";
import Logger from "@src/logger";
import debugRouter from "@src/routers/debugRouter";
import metaRouter from "@src/routers/metaRouter";
import parentRouter from "@src/routers/parent";
import childRouter from "@src/routers/child";
import os from "os";
import { getCommitHash, getCommitMessage } from "@utils/gitMeta";
import { Response, Request, Router } from 'express';
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
console.log("    Port: " + port);

console.log("====================================================================================================");
console.log("\n");

logger.info("Starting server...");

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

app.use(express.json());
logger.info("JSON parser enabled");

app.use('/parent', parentRouter);
logger.debug("Parent router mounted");
app.use('/child', childRouter);
logger.debug("Child router mounted");
app.use('/debug', debugRouter);
app.use('/meta', metaRouter);
logger.debug("Common routes mounted");
logger.info("Routers mounted");


app.listen(port, () => {
    logger.success(`Server started! Listening on port ${port}`);
});
