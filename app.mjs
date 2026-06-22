import express from "express";
import cors from "cors";

import routes from "./routes/routes.mjs";
import { errorHandler } from "./middlewares/error_handler.mjs";

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    "/uploads",
    express.static("uploads")
);

app.use("/api", routes);

app.use(errorHandler);

export default app;
