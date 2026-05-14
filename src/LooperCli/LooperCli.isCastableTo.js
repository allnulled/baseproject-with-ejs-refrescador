function(arg, typeId, castproxy) {
  try {
    castproxy.casted = this.castables[typeId](arg);
    castproxy.type = typeId;
    return true;
  } catch (error) {
    return false;
  }
}