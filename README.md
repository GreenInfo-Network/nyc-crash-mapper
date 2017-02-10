# NYC CRASH MAPPER
![](img/crash-mapper-lg.jpg)

Web application that geographically maps, filters, and aggregates NYC automobile collision data. Built with React, Redux, Leaflet, and CARTO.

This work was funded by [CHEKPEDS](http://chekpeds.com), a 501(c)(3) non-profit organization that was founded in 2005 and advocates for pedestrian safety, primarily focusing on the west side of Manhattan.

### Install
Requires NodeJS@^6 and NPM to be accessible globally. It is recommended to use Node
Version Manager (`nvm`) to ensure compatibility with Node and dependencies in `project.json`.

Assuming [`nvm`](https://github.com/creationix/nvm) is available globally, do:

```
nvm use && npm install
```

### Develop

```
npm run serve
```

### Build

```
npm run build
```

### Deploy
#### To Github Pages
Be sure this folder is under version control using `git` and is pointing to a remote repository on Github.

Enable permissions to read/execute the `deploy_gh_pages.sh` bash script:

```
chmod u+rx deploy_gh_pages.sh
```

Then do:

```
npm run deploy:gh-pages
```

That will run `npm build` and execute the bash script, creating a Github Pages site with the content of the `dist` directory.

### Data
Vehicle collision data for New York City for the years 1995 - 2016 was aggregated and normalized from 3 different sources:

- NYC Open Data [NYPD Motor Vehicle Collisions](https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95)

- [John Krauss](https://github.com/talos)'s [NYPD Crash Data Bandaid](https://github.com/talos/nypd-crash-data-bandaid) (PDF scraped data)

- NY DMV / DOT Collision Data, FOIL'd and processed by [Transportation Alternatives](http://transalt.org)

The complete dataset may be downloaded on the [CHEKPEDS CARTO account](#), free of charge.

At the time of launch, the dataset contains 1,455,665 rows, of which X are not geocoded due to the quality of source data. The majority of non-geocoded rows come from the NYC Open Data, though we did our best to geocode any rows that had valid address information in them, for example cross street names, borough, and zipcode using the [NYC GeoClient API](https://developer.cityofnewyork.us/api/geoclient-api). **We include non-geocoded data to advocate for the NYPD getting its act together to improve the quality of NYC's vehicle collision data. This means: geocoding all crash locations (not just 75% of them), providing values for contributing factors, and providing values for vehicle type for all crashes.**

Because the portion of the data which comes from the NYPD Crash Data Bandaid is summarized by month, each row for the dataset contains a value for `crash_count`. The only years that have a value higher than 1 for this field are for years that correspond to the NYPD Crash Data Bandaid, which are from July, 2011 to June, 2012.

Unfortunately, there is missing data from 2010/01/01 through 2011/07/31.

### Structure
This app is written in ES6, and compiled down to ES5 JavaScript via [Babel](https://babeljs.io) using [Webpack 2](https://webpack.js.org/). The application's point of entry is [`./src/index.jsx`](./src/main.jsx).

#### Redux
Redux uses the concept of keeping all application state within an immutable [store](http://redux.js.org/docs/basics/Store.html) and returning new application state via [action creators](http://redux.js.org/docs/basics/Actions.html).  [Reducers](http://redux.js.org/docs/basics/Reducers.html) trigger changes in the Store after receiving Actions from Action Creators. When the app loads its store is hydrated from query params in the URL hash.

- [`action creators`](./src/actions/)
- [`action types`](./src/constants/action_types.js)
- [`reducers`](./src/reducers/)
- [`store configuration`](./src/store.js)
- [`default store`](./src/constants/api.js)

#### React
All UI components are built using [React](https://facebook.github.io/react/), which allow for transforming application data into UI views.

This project follows the React Redux concept of using "Containers" which are connected to the Redux store and action creators via [React-Redux](https://github.com/reactjs/react-redux). Regular components receive data from Containers or parent components as props, and only use Component level state for trivial UI state, eg: tracking whether or not a map filter UI is collapsed or opened.

- [`components`](./src/components/)
- [`containers`](./src/containers/)

The main scaffolding of the app resides within `src/components/App.jsx`.
The app is connected to Redux via `Provider` and rendered to the DOM within `./src/index.jsx`.

#### Configuration
This app uses [CARTO](https://carto.com) as a backend datastore and web map tile generator. The CARTO user name, data tables, and other app config parameters are specified in `./src/constants/app_config.js`.

#### Sass variables
This app uses [SASS]() which compiles down to regular CSS. The Sass is organized into partials that map to specific React components in [./scss/components/]('./scss/components/').

#### Skeleton
The template uses a slightly modified [Sass version](https://github.com/WhatsNewSaes/Skeleton-Sass) of [Skeleton](http://getskeleton.com/). To minimize the compiled CSS footprint, comment out any unused Skeleton modules in [`skeleton.scss`](./scss/skeleton/skeleton.scss).
