#!/bin/bash

npm install
npm run clean
npm run build

git clone https://github.com/codesher-blog/codesher-blog.github.io.git publish



cd ./publish
git rm -r *
cp -r ../public/* ./
git add --all
git commit -m 'updated'
git push -f origin master

cd ..
rm -rf ./publish