const config = process.env.config;

export function getConfig() {
  return config
}

export function faNumbers(value) {
  if (typeof value === "number") {
    var value = value.toString();
  }

  return value.split('').reduce(function (result, char) {
    var charCode = char.charCodeAt(0)
    if (charCode >= 48 && charCode <= 57) { // when charachter is 0 to 9
      return result + String.fromCharCode(charCode + 1728)
    }
    return result + char;
  }, "");
}