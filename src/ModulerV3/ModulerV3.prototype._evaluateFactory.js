(callback, dependencies, definition) {
  return callback(...dependencies.concat([definition, this]));
}