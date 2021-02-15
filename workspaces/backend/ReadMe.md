# koa Backend
## Documentation
The server uses koa for route handling and the two primary packages to review are:
* [koa]()
* [koa/Router]()

The routes pass the results to `sendResponse()` which handles some of the repetive tasks involved in route handling such as status and error handling.

## Getting Started
### Install
From the project root directory:
`npm install-backend`

From the workspace directory(`./workspaces/backend/`)
`npm install`


### Serve
From the project root directory:
`npm run serve-backend`

From the workspace directory(`./workspaces/backend/`)
`npm run serve-backend`


### Installing Dependencies

When needing to install a new dependency do some from within the workspace directory(`./workspaces/backend/`), so that all backend packages are contained with the backend workspaces `package.json`.

Be sure to update the `server_config.js` file with your local server information. 

## Issues
If you need assistance please do one of the following:
* Open an [Issue](https://github.com/cw00dw0rd/ArangoBnB/issues).
* Post your question in the [project discussions](https://github.com/cw00dw0rd/ArangoBnB/discussions).
* Reach out in the [ArangoDB Community Projects](https://arangodb-community.slack.com/archives/C01MLH491UM) Slack channel.