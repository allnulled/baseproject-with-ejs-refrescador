function(arg, typeId, castproxy) {
  try {
    castproxy.casted = this.type.classes[typeId].cast(arg);
    castproxy.type = typeId;
    return true;
  } catch (error) {
    return false;
  }
}