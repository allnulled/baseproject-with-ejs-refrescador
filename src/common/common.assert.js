(condition, message) {
  if(!condition) throw new Error(<%-typeof owner === "string" ? JSON.stringify("assertion error on «" + owner+"»: ") + " + " :''%>message);
}