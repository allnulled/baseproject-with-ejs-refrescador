module.exports = class TestUtil {

  static debugErrors(errors) {
    let out = "";
    for(let indexError=0; indexError<errors.length; indexError++) {
      const {error, testId, testPath} = errors[indexError];
      out += Colors.style("bgRed,black").text(` - Test:    ${testPath.toUpperCase()}`) + "\n";
      out += Colors.style("red").text(` - Type:    ${error.name}`) + "\n";
      out += Colors.style("yellow").text(` - Message: ${error.message}`) + "\n";
      out += Colors.style("magenta").text(` - Stack:   ${error.stack}`) + "\n";
    }
    console.log(Colors.box(out.trimEnd()));
  }

}