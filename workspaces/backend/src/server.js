import { ServerConfig } from "./server_config";
import Koa from "koa";
import koaBody from "koa-body";
import { ApiRouter } from "./api";
import { ArangoClient } from "./arangojs-client";

const cors = require('@koa/cors');
const App = new Koa();
App.use(koaBody());
App.use(cors());
App.use(ApiRouter.routes());

App.context.db = ArangoClient;

App.listen(ServerConfig.server_port, () => {
  console.log(`ArangoBnb API Backend listening on :${ServerConfig.server_port}`)
});
