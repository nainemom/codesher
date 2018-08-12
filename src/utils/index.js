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

export function serialize(obj) {
  return Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')
}

export function deserialize(queryString) {
  if (queryString.indexOf('?') > -1) {
    queryString = queryString.split('?')[1];
  }
  var pairs = queryString.split('&');
  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return result;
}