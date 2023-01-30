import { Application, Session } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { router } from "./routes/routes.js";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();
app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(userMiddleware);
app.use(authMiddleware);
app.use(roleMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(oakCors());
app.use(router.routes());

export { app };
