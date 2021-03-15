export const ServerConfig = {
  server_port: 5000,
  arangodb_url: process.env.DB_URL || "http://localhost:8529",
  arangodb_encoded_ca: "",
  arangodb_database: process.env.DB_DATABASE || "arangobnb",
  arangodb_username: process.env.DB_USER || "root",
  arangodb_password: process.env.DB_PASSWORD || "",
};
