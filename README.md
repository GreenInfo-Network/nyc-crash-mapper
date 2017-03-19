# NYC CRASH MAPPER
![](img/crash-mapper-lg.jpg)

Web application that geographically maps, filters, and aggregates NYC automobile collision data. Built with CARTO, ES6, React, Redux, Leaflet, and Webpack2.

This work was funded by [CHEKPEDS](http://chekpeds.com), a 501(c)(3) non-profit organization that was founded in 2005 and advocates for pedestrian safety, primarily focusing on the west side of Manhattan.

**NYC Crash Mapper** was designed and built by [Chris Henrick](http://clhenrick.io).

### Install
Installation of this app requires knowledge of the command line interface and a shell application such as Terminal on Mac OS.

App was developed using `NodeJS @ ^6.7`, `NPM @ ^3.10`, and `Yarn @ ^0.21.3`.

It is recommended to use Node Version Manager ([`nvm`](https://github.com/creationix/nvm)) and [Yarn](https://yarnpkg.com) to ensure compatibility with NodeJS and dependencies in `project.json`.

Assuming `nvm` is available globally, do:

```
nvm use
```

If you get an error such as

```
N/A: version v6.7.0 is not yet installed
```

Then do:

```
nvm install 6.7
```

To install the app's dependencies do:

```
yarn -i
```

### Develop
To start the webpack dev server and run the app locally do:

```
npm run serve
```

And open your browser to `localhost:8080`. Any changes made to the app's code base will cause Webpack to recompile the source code and refresh the browser. ES Lint will report any javascript errors as well as complain about broken style rules.

### Build
To compile the source code do:

```
npm run build
```

The compiled code will be available in the `dist/` directory.

### Deploy
Currently the app is being hosted using Github Pages.

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

That will execute the `build` script then the bash script, creating a Github Pages site with the content of the `dist` directory.

### About the Data
NYC Crash Mapper uses vehicle collision data for New York City from August, 2011 - present. The data was aggregated and normalized from the following sources:

- NYC Open Data Portal (Socrata) [NYPD Motor Vehicle Collisions](https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95)

- Civic hacker [John Krauss](https://github.com/talos)'s [NYPD Crash Data Bandaid](https://github.com/talos/nypd-crash-data-bandaid) (PDF scraped data)

The complete dataset may be downloaded via the [Chekpeds CARTO account](https://chekpeds.carto.com/crashes_all_prod).

At the time of launch, the combined data contained 1,075,468 rows, of which 157,554 rows were not geocoded due to the source data lacking values for latitude and longitude or adequate address attributes. The majority of non-geocoded rows come from the NYC Open Data.

Prior to importing the data into CARTO, rows lacking lat lon with potentially valid address information were attempted to be geocoded using the [NYC GeoClient API](https://developer.cityofnewyork.us/api/geoclient-api). For example, if a row lacked values for lat lon, but contained values for cross streets and borough or zip code, the NYC GeoClient [intersection endpoint](https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.5) was used to geocode the crash location.

Stats displayed in the bottom UI for number of total crashes, injuries, and fatalities will differ from what is shown on the map when the app's "Filter By Boundary" is set to "Citywide." Stats display counts for all collision data, whether geocoded or not, while the map only displays data that has valid lat lon coordinates and thus can be geographically mapped. When a "Filter By Boundary" setting other than "Citywide" is used, such as a "Community Board", the stats UI will only display counts for data that has been geocoded and falls within a selected boundary.

_**We include non-geocoded data in the app's "citywide" query to advocate for the NYPD getting its act together to improve the quality of NYC's vehicle collision data. This means: geocoding all crash locations (not just 75% of them), providing values for contributing factors, and providing values for vehicle type for all crashes.**_

Because the portion of the data which comes from the **NYPD Crash Data Bandaid** is summarized by month, each row for the dataset contains a value for `crash_count`. The only rows that have a value higher than 1 for this field are for rows that correspond to the NYPD Crash Data Bandaid, which are from July 2011 to June 2012. Unfortunately this limits the app to filtering data by month and year, rather than day and time.

#### Data Updates

Collision data is updated using an [ETL Script](https://github.com/clhenrick/nyc-crash-mapper-etl-script) that runs daily, consuming data from the NYC Open Data Portal, formatting it for the NYC Crash Mapper crash data table, and inserting it using the [CARTO SQL API](https://carto.com/docs/carto-engine/sql-api) if the data does not currently exist in CARTO.

#### Notes on importing data into CARTO
Because the app's database folds values from multiple columns for the **contributing factor** and **vehicle type** categories into single Postgres text array columns for each category, exporting the data from a local PostgreSQL db and importing it into CARTO requires special attention. CARTO _will not_ recognize array columns when importing data so you must do some data processing to get them to be recognized as such. See [2016_data_update.sql](./sql/2016_data_update.sql) for how this was accomplished in March 2017.

### App Structure
This app is written in ES6, and compiles to ES5 JavaScript via [Babel](https://babeljs.io) using [Webpack 2](https://webpack.js.org/). The application's point of entry is [`./src/index.jsx`](./src/main.jsx).

#### Redux
Redux uses the concept of keeping all application state within an immutable [store](http://redux.js.org/docs/basics/Store.html) and returning new application state via [action creators](http://redux.js.org/docs/basics/Actions.html).  [Reducers](http://redux.js.org/docs/basics/Reducers.html) trigger changes in the Store after receiving Actions from Action Creators. When the app loads its store is hydrated from query params in the URL hash if they are present. This easily allows for the sharing of application state between users via the app's URL.

- [`action creators`](./src/actions/index.js)
- [`action types`](./src/constants/action_types.js)
- [`reducers`](./src/reducers/index.js)
- [`store configuration`](./src/store.js)
- [`default store`](./src/constants/api.js)

#### React
All UI components are built using [React](https://facebook.github.io/react/), which allow for transforming application data into UI views.

This project follows the React Redux concept of using "Containers" which may be connected to the Redux store and/or action creators via [React-Redux](https://github.com/reactjs/react-redux). Regular components receive data from Containers or parent components as props, and only use Component level state for trivial UI changes, eg: tracking whether or not a UI panel is collapsed or opened.

- [`components`](./src/components/)
- [`containers`](./src/containers/)

The main scaffolding of the app resides within `src/components/App.jsx`.
The app is connected to Redux via `Provider` and rendered to the DOM within `./src/index.jsx`.

#### Configuration
This app uses [CARTO](https://carto.com) as a backend datastore and web map tile generator. The CARTO user name, data tables, and other app configuration parameters are specified in `./src/constants/app_config.js`.

Note that any tables used by the app must be set to either `"Public"` or `"With Link"` via the CARTO dashboard.

#### SQL
PostgreSQL and PostGIS power the app via CARTO.

The app uses ES6 Template Literals to generate SQL queries based on values from the Redux Store. These are available in [./src/constants/sql_queries.js](./src/constants/sql_queries.js).

Sample SQL queries are stored in `./sql` are for reference and are not used by the app during runtime.

#### Sass
This app uses [SASS]() which compiles down to regular CSS. The Sass is organized into partials that map to specific React components in `./scss/components/`.

#### Skeleton
The app uses a slightly modified [Sass version](https://github.com/WhatsNewSaes/Skeleton-Sass) of the [Skeleton](http://getskeleton.com/) CSS framework.
