module.exports = async function() {
  const fs = require("fs/promises");
  const path = require("path");
  const {glob} = require("glob");
  const projectRoot = path.resolve(__dirname, "../..");
  const ignoredSubpaths = ["node_modules/**", "coverage/**", "dist/**", "test/**", "dev/**"];
  const sources = await glob("**/*.js", {
    cwd: projectRoot,
    ignore: ignoredSubpaths
  });
  const regexDocComment = /(\/\*@doc(?:[^*]|\*(?!\/))*\*\/)|(\/\/\@doc[^\n]+)/g;
  console.log(`[*] Found ${sources.length} sources to document.`);
  const docjson1 = {};
  Iterating_sources:
  for(let index=0; index<sources.length; index++) {
    const source = sources[index];
    const content = await fs.readFile(source, "utf8");
    const comments = content.match(regexDocComment);
    if(comments) docjson1[source] = Object.assign({}, comments);
  }
  console.log(docjson1);
}