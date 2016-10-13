#!/usr/bin/env bash
# run webpack to generate javascript bundles
which webpack >/dev/null || set webpack="./node_modules/webpack/bin/webpack.js"

echo "Compiling React JSX modules..." && webpack --progress --colors

echo "Compiling java source..." && ./mvnw package
