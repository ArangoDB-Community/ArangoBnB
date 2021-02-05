import { ServerConfig } from "./server_config";
import Koa from "koa";
import { ApiRouter } from "./api";

const App = new Koa();

App.use(ApiRouter.routes());

App.listen(ServerConfig.server_port, () => {
  console.log(`ArangoBnb API Backend listening on :${ServerConfig.server_port}`)
});
