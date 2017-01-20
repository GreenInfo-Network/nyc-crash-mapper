#!/bin/bash
# deploys contents of the dist dir to Github Pages

git checkout -B gh-pages
git add -f dist
git commit -am "Rebuild website"
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages
git checkout -
