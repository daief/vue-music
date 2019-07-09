#!/bin/bash

set -e # exit with nonzero exit code if anything fails
echo "Starting to update gh-pages\n"

git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

cd dist
git init
git add -f .
git commit -m "Travis build"
git push --force --quiet "https://${GIT_TOKEN}@github.com/daief/vue-music.git" master:gh-pages > /dev/null

echo "Done updating gh-pages\n"

else
 echo "Skipped updating gh-pages, because build is not triggered from the master branch."
fi;