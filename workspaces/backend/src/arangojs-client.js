import { Database } from "arangojs";
import { ServerConfig } from "./server_config";

function getArangoDbClient() {
  const config = { 
    url: ServerConfig.arangodb_url,
    databaseName: ServerConfig.arangodb_database,
    username: ServerConfig.arangodb_username,
    password: ServerConfig.arangodb_password 
  };

  if (ServerConfig.arangodb_encoded_ca) {
    config.agentOptions = { ca: Buffer.from(ServerConfig.arangodb_encoded_ca, "base64") };
  }

  return new Database(config);
}

export const ArangoClient = getArangoDbClient();
