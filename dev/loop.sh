#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"
cd ..

node dev/builder.js $0

# Usar el devtool es más lento, pero tienes:

# npm run devtool build $0
# npm run devtool document