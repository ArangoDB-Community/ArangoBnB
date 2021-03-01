# ArangoBnB
This web app is being created to showcase the GeoJSON functionality of ArangoSearch and to provide an example of ArangoDB being used in a JavaScript stack.

To get started:
* Say hello in the [GitHub Discussions](https://github.com/cw00dw0rd/ArangoBnB/discussions)
* Check out the project todos:
  * [Primary Project board (Vue frontend & Backend tasks)](https://github.com/cw00dw0rd/ArangoBnB/projects/1)
  * [React Project board](https://github.com/users/cw00dw0rd/projects/1), (thanks [@couds](https://github.com/couds) and [@lostpebble](https://github.com/lostpebble) for leading the react version.)
* The dataset will need some modeling changes to take advantage of ArangoDB features so keep an eye out for changes to the dataset task [#16](https://github.com/cw00dw0rd/ArangoBnB/issues/16).
  * The dataset we are using can be found [here](https://drive.google.com/drive/folders/1crMM2RRpdVgi7gkblAlAZXTvIoNNVYbT?usp=sharing). We will make new folders for new dumps when necessary. [https://drive.google.com/drive/folders/1crMM2RRpdVgi7gkblAlAZXTvIoNNVYbT?usp=sharing](https://drive.google.com/drive/folders/1crMM2RRpdVgi7gkblAlAZXTvIoNNVYbT?usp=sharing)
* We now have a community projects Slack channel, [join us](https://arangodb-community.slack.com/archives/C01MLH491UM)!

Some goals for the project include:
* Search an AirBnB dataset to find rentals nearby a specified location
* Filter these based on keywords, date, and number of guests
* Natural language search (Ex: Houses in Florida with pools.)
* Index data using ArangoSearch Views
* Use AQL for all queries

We would enjoy having anyone from the community participate in the project development! 
If you have any suggestions or features that you would like to be added start a discussion or open an issue.

# Contributing

## ArangoDB Installation

This project uses features from the upcoming 3.8 version of ArangoDB. To get started you will need the nightly build version of ArangoDB.
For more information on how to get a nightly build please see the [nighly builds page](https://www.arangodb.com/nightly-builds/).

Currently, the changes are in `3.8.0` so make sure to use the `3.8.0-nightly` build.
For example, if you are using docker:
```
docker pull arangodb/arangodb-preview:3.8.0-nightly

docker run -d -e ARANGO_ROOT_PASSWORD="test" -p 8529:8529 arangodb/arangodb-preview:3.8.0-nightly
 
```

## Project Setup

Each frontend maintains its own package.json for dependencies. 
The root package.json handles the installation of packages for whichever package you choose to install.
Running `npm install` will install both sets of packages for Vue and React. 

If you would like to only install the individual packages append the framework name. ie: `npm run install-vue`

## Vue Project setup
From the project root directory run:
```
npm install
or
npm run install-vue
```

### Vue Compiles and hot-reloads for development
```
npm run serve
```

### Vue Compiles and minifies for production
```
npm run build
```

### Vue Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## React Project Setup
From the project root directory run:
```
npm install
or
npm run install-react
```

### Serve the react fronted
```
npm run serve-react
```
