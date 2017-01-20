# nyc-crash-mapper
Web application that geographically maps, filters, aggregates, & provides trends of NYC automobile collision data that is published by the NYPD.

## Install
Requires NodeJS@^6 and NPM to be accessible globally. It is recommended to use Node
version Manager to ensure compatibility with Node and dependencies in `project.json`.

Assuming [`nvm`](https://github.com/creationix/nvm) is available globally, do:

```
nvm use && npm install
```

## Develop

```
npm run serve
```

## Build

```
npm run build
```

## Deploy
### To Github Pages

```
export NODE_ENV=production
git checkout -B gh-pages
git add -f dist
git commit -am "Rebuild website"
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages
git checkout -
```
