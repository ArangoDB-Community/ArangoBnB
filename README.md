# ArangoBnB
This web app is being created to showcase the GeoJSON functionality of ArangoSearch and to provide an example of ArangoDB being used in a JavaScript stack.

To get started:
* Say hello in the [GitHub Discussions](https://github.com/cw00dw0rd/ArangoBnB/discussions)
* Check out the project todos:
  * [Primary Project board (Vue frontend & Backend tasks)](https://github.com/cw00dw0rd/ArangoBnB/projects/1)
  * [React Project board](https://github.com/users/cw00dw0rd/projects/1), (thanks [@couds](https://github.com/couds) and [@lostpebble](https://github.com/lostpebble) for leading the react version.)
* The dataset we are currently working with can be downloaded from [Kaggle](https://www.kaggle.com/brittabettendorf/berlin-airbnb-data?select=listings_summary.csv). This will need some modeling changes to take advantage of ArangoDB features so keep an eye out for changes to that task [#16](https://github.com/cw00dw0rd/ArangoBnB/issues/16). We will update this bullet once we have landed on the final dataset.

Some goals for the project include:
* Search an AirBnB dataset to find rentals nearby a specified location
* Filter these based on keywords, date, and number of guests
* Natural language search (Ex: Houses in Florida with pools.)
* Index data using ArangoSearch Views
* Use AQL for all queries

We would enjoy having anyone from the community participate in the project development! 
If you have any suggestions or features that you would like to be added start a discussion or open an issue.

# Contributing 

Each frontend maintains its own package.json for dependencies. 
The root package.json handles the installation of packages for whichever package you choose to install.
Running `npm install` will install both sets of packages for Vue and React. 

If you would like to only install the individual packages append the framework name. ie: `npm install-vue`

## Vue Project setup
From the project root directory run:
```
npm install
or
npm install-vue
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
Make sure you have npm 7 installed. From the project root directory run:
```
npm install
```

### Serve the react fronted
```
npm run serve-react
```
