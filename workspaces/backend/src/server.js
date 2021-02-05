import "./server_config";
import Koa from "koa";
import { ApiRouter } from "./api";

const App = new Koa();

App.use(ApiRouter.routes());

const port = 5000;

App.listen(port, () => {
  console.log(`ArangoBnb API Backend listening on :${port}`)
});
