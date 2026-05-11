#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"

refrescador \
    -w "$(pwd)" \
    -i "**/node_modules/**" \
    -i "**.dist.**" \
    -d 0 \
    -e "sh" \
    -e "ts" \
    -e "tsx" \
    -e "txt" \
    -e "js" \
    -e "json" \
    -e "css" \
    -e "html" \
    -x 'node build.js @{refrescador.file}' \
    -s "test/browser" \
    -up "moduler-v3"