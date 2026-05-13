#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"
cd ..

refrescador \
    -w "$(pwd)" \
    -i "**/node_modules/**/*" \
    -i "**/dist/**/*" \
    -i "**/coverage/**/*" \
    -i "**/.nyc_output/**/*" \
    -i "**/dist-instrumented/**/*" \
    -d 0 \
    -e "sh" \
    -e "ts" \
    -e "tsx" \
    -e "txt" \
    -e "js" \
    -e "json" \
    -e "css" \
    -e "html" \
    -e "md" \
    -x 'node dev/build.js @{refrescador.file}' \
    -s "test/browser" \
    -up "moduler-v3" \
    -mf "TODO.md" \
